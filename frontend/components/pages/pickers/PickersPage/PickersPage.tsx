import { useEffect, useMemo } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  RingProgress,
  Space, Tabs,
  Title,
} from '@mantine/core';
import useSWR from 'swr';

import { WarningMsg } from 'components/elements';
import { CrumbsTable } from 'components/entities';
import CrumbsTimeLine from 'components/groups/CrumbsTimeLine';
import theme from 'config/theme';
import { crumbs as content } from 'content';
import useCrumbsContext from 'contexts/crumbs/crumbsContext';
import * as crumbsFixturesRequest from 'pages/api/crumbs/fixtures';
import { CrumbType, PaymentType } from 'types';

import styles from './PickersPage.module.scss';

const RING_PROGRESS_SIZE = 400;
const RING_PROGRESS_THICKNESS = 40;

const PickersPage: NextPage = () => {
  const router = useRouter();
  const crumbsContext = useCrumbsContext();
  const { accountCrumbs = [], isLoading: isGetCrumbsLoading, error: getCrumbsError } = crumbsContext;
  const { domain } = router.query;

  const {
    data: fixtureCrumbs = [],
    error: fixtureCrumbsError,
  } = useSWR(crumbsFixturesRequest.path, crumbsFixturesRequest.get);

  const allCrumbs = useMemo(() => [
    ...fixtureCrumbs,
    ...accountCrumbs,
  ],
  [fixtureCrumbs, accountCrumbs]);

  const ringResumeData = useMemo(() => {
    const allPayments: PaymentType[] = (allCrumbs || [])
      .reduce((payments: PaymentType[], crumb: CrumbType) => [...payments, ...(crumb.payments || [])], []);
    const earns: number = allPayments.reduce((sum: number, payment: PaymentType) => (payment.paid
      ? sum + payment.price
      : sum),
    0);
    const unpaid: number = allPayments.reduce((sum: number, payment: PaymentType) => (!payment.paid
      ? sum + payment.price
      : sum),
    0);
    const totalPayments: number = allPayments.reduce((sum: number, payment: PaymentType) => sum + payment.price,
      0);

    return [
      {
        label: 'Earns',
        value: (earns * 100) / totalPayments,
        color: theme.primaryColor,
      },
      {
        label: 'Unpaid',
        value: (unpaid * 100) / totalPayments,
        color: theme.errorColor,
      },
    ];
  }, [allCrumbs]);

  useEffect(() => {
    crumbsContext.setDomain(domain);
  }, [crumbsContext, domain]);

  const isFixtureCrumbsLoading = !fixtureCrumbs && !fixtureCrumbsError;
  const isCrumbsLoading = isGetCrumbsLoading || isFixtureCrumbsLoading;

  return (
    <div className={ styles.PickersPage }>
      { !!content.warning && (
        <WarningMsg msg={ content.warning } />
      ) }
      <Space h="xl" />
      <Title order={ 1 }>{ content.title }</Title>
      <Space h="xl" />
      <Space h="xl" />
      <div className={ styles.Content }>
        <section>
          <RingProgress
            className={ styles.ResumeRing }
            label={ content.resumeRing }
            sections={ ringResumeData }
            size={ RING_PROGRESS_SIZE }
            thickness={ RING_PROGRESS_THICKNESS }
          />
        </section>
        <section>
          <Tabs
            className={ styles.CrumbTabs }
            position="center"
          >
            <Tabs.Tab
              label={ content.tableTab }
            >
              <CrumbsTable
                className={ styles.Crumbs }
                crumbs={ allCrumbs }
                isLoading={ isCrumbsLoading }
              />
            </Tabs.Tab>
            <Tabs.Tab
              label={ content.schemaTab }
            >
              <CrumbsTimeLine
                className={ styles.CrumbsTimeLine }
                crumbs={ allCrumbs }
                isLoading={ isCrumbsLoading }
              />
            </Tabs.Tab>
          </Tabs>
        </section>
        { /* !!getCrumbsError && <Text color="red">{ String(getCrumbsError) }</Text> */ }
      </div>
    </div>
  );
};

export default PickersPage;
