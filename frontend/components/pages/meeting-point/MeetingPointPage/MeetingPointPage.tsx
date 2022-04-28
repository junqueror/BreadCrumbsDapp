import { useEffect } from 'react';
import type { NextPage } from 'next';
import { Space, Tabs, Title } from '@mantine/core';
import useSWR, { SWRConfig } from 'swr';

import { WarningMsg } from 'components/elements';
import { api, contracts } from 'config/routing';
import { meetingPoint as content } from 'content';
import { MeetingPointSection } from 'content/meetingPoint';
import useBasketsContext from 'contexts/baskets/basketsContext';
import { useScreenSize } from 'hooks';
import useFunctionAtInterval from 'hooks/useFunctionAtInterval';
import * as basketSite from 'pages/api/baskets/[domain]';
import * as baketFixturesRequest from 'pages/api/baskets/fixtures';
import { basketsBlockchainService } from 'services/blockchain/BasketsBloackchainService';
import { BasketType } from 'types';

import { MeetingPointSeo } from '../components';
import { BasketsSection } from '../sections';

import styles from './MeetingPointPage.module.scss';

const MAX_SSR_BASKETS = 9;

export const getServerSideProps = async (_context: any) => {
  const baskets: BasketType[] = (await basketsBlockchainService.getBaskets() || [])
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
        [baketFixturesRequest.path]: baketFixturesRequest.initialData,
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

const MeetingPointPage: NextPage<Props> = ({ fallback, onSetSWRfallback }) => {
  const { isXS } = useScreenSize();
  const { activeBaskets, isLoading: isActiveBasketsLoading, getBaskets } = useBasketsContext();
  useFunctionAtInterval(getBaskets);

  const {
    data: fixtureBaskets = [],
    error: fixtureBasketsError,
  } = useSWR(baketFixturesRequest.path, baketFixturesRequest.get);

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

  const getTabLabel = (_section: MeetingPointSection) => ((isXS && _section.titleXS) ? _section.titleXS : _section.title);

  const isUpcomingBasketsLoading = (!fixtureBaskets && !fixtureBasketsError);
  const isLoading = false; // TODO: Remove false when data is availabel in production
  // const isLoading = isActiveBasketsLoading || isUpcomingBasketsLoading;

  return (
    <div className={ styles.MeetingPointPage }>
      <MeetingPointSeo />
      <SWRConfig value={ { fallback } }>
        { !!content.warning && (
          <WarningMsg msg={ content.warning } />
        ) }
        <Space h="xl" />
        <Title order={ 1 }>
          { content.title }
        </Title>
        <Tabs
          className={ styles.Tabs }
          grow
          position="apart"
        >
          { content.sections.map((section: MeetingPointSection) => (
            <Tabs.Tab
              key={ `tab-section-${section.title}` }
              label={ getTabLabel(section) }
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

MeetingPointPage.defaultProps = defaultProps;

export default MeetingPointPage;
