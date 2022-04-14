import { useEffect } from 'react';
import type { NextPage } from 'next';
import { Space, Tabs, Text, Title } from '@mantine/core';
import useSWR, { SWRConfig } from 'swr';

import BasketsSection from 'components/pages/meetingPoint/sections/BasketsSection';
import { api, contracts } from 'config/routing';
import { meetingPoint } from 'content';
import useBasketsContext from 'contexts/baskets/basketsContext';
import useFunctionAtInterval from 'hooks/useFunctionAtInterval';
import * as basketSite from 'pages/api/baskets/[domain]';
import * as upcomingBasketsRequest from 'pages/api/baskets/fixtures';
import { basketServiceOnServer } from 'services/basketsService';
import { BasketType } from 'types';

import styles from './MeetingPoint.module.scss';

const MAX_SSR_BASKETS = 9;

export const getServerSideProps = async (_context: any) => {
  const baskets: BasketType[] = (await basketServiceOnServer.getBaskets() || [])
    .slice(0, MAX_SSR_BASKETS)
    .map((basket: BasketType): BasketType => ({
      ...basket,
      amount: String(basket.amount),
      price: String(basket.price),
    }));

  const domains = baskets.map((basket: BasketType) => basket.domain);

  const sites: basketSite.SiteType[] = await basketSite
    .getManySitesData(domains);

  return {
    props: {
      fallback: {
        [contracts.baskets.getAllBaskets]: baskets,
        [basketSite.manyPath]: sites,
        [upcomingBasketsRequest.path]: upcomingBasketsRequest.initialData,
      },
    },
  };
};

type Props = {
  fallback?: any,
  onSetSWRfallback: Function,
};

const defaultProps = {
  fallback: {
    [api.baskets]: [],
  },
  onSetSWRfallback: () => {},
};

const MeetingPoint: NextPage<Props> = ({ fallback, onSetSWRfallback }) => {
  const { activeBaskets, isLoading: isActiveBasketsLoading, getBaskets } = useBasketsContext();
  useFunctionAtInterval(getBaskets);

  const {
    data: fixtureBaskets = [],
    error: fixtureBasketsError,
  } = useSWR(upcomingBasketsRequest.path, upcomingBasketsRequest.get);

  useEffect(() => {
    onSetSWRfallback(fallback);
  }, [fallback, onSetSWRfallback]);

  const allbaskets = [
    ...activeBaskets,
    ...fixtureBaskets.map(basket => ({
      ...basket,
      startDate: new Date(basket.startDate),
      endDate: basket.endDate ? new Date(basket.endDate) : undefined,
    })),
  ];

  const isUpcomingBasketsLoading = (!fixtureBaskets && !fixtureBasketsError);
  const isLoading = isActiveBasketsLoading || isUpcomingBasketsLoading;

  return (
    <div className={ styles.MeetingPoint }>
      <SWRConfig value={ { fallback } }>

        { !!meetingPoint.warning && (
          <Text className={ styles.Warning }>
            { meetingPoint.warning }
          </Text>
        ) }
        <Space h="xl" />
        <Title order={ 1 }>
          { meetingPoint.title }
        </Title>
        <Tabs
          className={ styles.Tabs }
          grow
          position="apart"
        >
          { meetingPoint.sections.map(section => (
            <Tabs.Tab
              key={ `tab-section-${section.title}` }
              label={ section.title }
            >
              <BasketsSection
                baskets={ section.basketType
                  ? allbaskets.filter(basket => basket.type === section.basketType)
                  : allbaskets }
                className={ styles.BasketsSection }
                description={ section.description }
                isLoading={ isLoading }
                title={ section.title }
              />
            </Tabs.Tab>
          ))}
        </Tabs>
      </SWRConfig>
    </div>
  );
};

MeetingPoint.defaultProps = defaultProps;

export default MeetingPoint;
