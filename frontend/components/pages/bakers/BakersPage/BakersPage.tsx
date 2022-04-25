import { useCallback, useState } from 'react';
import type { NextPage } from 'next';
import {
  Button, Drawer, Space, Title,
} from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import classnames from 'classnames';
import useSWR from 'swr';

import { WarningMsg } from 'components/elements';
import Basket, { BasketSkeleton } from 'components/entities/Basket';
import BasketForm from 'components/forms/BasketForm';
import GridGroup from 'components/groups/GridGroup';
import theme from 'config/theme';
import { bakers as content } from 'content';
import useAccountContext from 'contexts/account/accountContext';
import useBasketsContext from 'contexts/baskets/basketsContext';
import { useFunctionAtInterval, useScreenSize } from 'hooks';
import * as upcomingBasketsRequest from 'pages/api/baskets/fixtures';
import { BasketType } from 'types';

import styles from './BakersPage.module.scss';

const BakersPage: NextPage = () => {
  const { account } = useAccountContext();
  const basketsContext = useBasketsContext();
  const [createOpened, setCreateOpened] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState<string>();
  const { isSM } = useScreenSize();
  const notifications = useNotifications();
  const {
    data: fixtureBaskets = [],
    error: fixtureBasketsError,
  } = useSWR(upcomingBasketsRequest.path, upcomingBasketsRequest.get);

  const currentDate = new Date();
  const baskets: BasketType[] = fixtureBaskets.map(basket => ({
    ...basket,
    startDate: new Date(basket.startDate),
    endDate: basket.endDate ? new Date(basket.endDate) : undefined,
  }));

  const currentBaskets = [
    ...basketsContext.accountBaskets,
    ...baskets.filter((basket: BasketType) => !basket.title?.includes('breadcrumbs')
    && currentDate < basket.startDate), // FIXME: Remove fixtures and add real baskets
  ];
  const basketsHistory = [
    ...basketsContext.accountBaskets,
    ...baskets.filter((basket: BasketType) => !basket.title?.includes('breadcrumbs')
    && currentDate >= basket.startDate), // FIXME: Remove fixtures and add real baskets
  ];
  const isBasketsLoading = !baskets && !fixtureBasketsError;

  const openCreateBasket = () => setCreateOpened(true);
  const closeCreateBasket = () => setCreateOpened(false);

  const createBasket = useCallback(async (values: {
    domain: string,
    amount: any,
    price: any,
  }) => {
    setCreateLoading(true);

    const { domain } = values;

    basketsContext.createBasket(domain, values.amount, values.price)
      .then(() => {
        setCreateLoading(false);
        setCreateError(undefined);
        closeCreateBasket();
        notifications.showNotification({
          title: content.sections[0].infoNotification?.title,
          message: content.sections[0].infoNotification?.message(domain),
          color: 'green',
        });
      }).catch((error: Error) => {
        setCreateError(error.message);
        setCreateLoading(false);
        notifications.showNotification({
          title: content.sections[0].errorNotification?.title,
          message: content.sections[0].errorNotification?.message(domain),
          color: 'red',
          autoClose: 5000,
        });
      });
  }, [basketsContext, notifications]);

  useFunctionAtInterval(basketsContext.getBaskets);

  const createDisabled = !account.address;
  const newBasketButtonClassName = classnames(styles.AccentButton, { [styles.Disabled]: createDisabled });

  return (
    <div className={ styles.BakersPage }>
      { !!content.warning && (
      <WarningMsg msg={ content.warning } />
      ) }
      <Space h="xl" />
      <Title order={ 1 }>{ content.title }</Title>
      <Space h="xl" />
      <section
        className={ styles.Section }
        id={ content.sections[0].id }
      >
        <Title order={ 2 }>{ content.sections[0].title }</Title>
        <Space h="xl" />
        <GridGroup
          data={ currentBaskets } // TODO: data={ basketsContext.accountBaskets }
          isLoading={ isBasketsLoading } // TODO: isLoading={ basketsContext.isLoading
          Item={ Basket }
          itemClassName={ styles.Basket }
          Skeleton={ BasketSkeleton }
        />
        <div className={ styles.Buttons }>
          <Button
            className={ newBasketButtonClassName }
            color={ theme.mantine.primaryColor }
            disabled={ createDisabled }
            onClick={ openCreateBasket }
          >
            { content.sections[0].button }
          </Button>
        </div>
        <Space h="xl" />
        <Drawer
          opened={ createOpened }
          padding="xl"
          position={ isSM ? 'bottom' : 'left' }
          size="xl"
          title={ content.sections[0].button }
          onClose={ closeCreateBasket }
        >
          <BasketForm
            error={ createError }
            isDisabled={ createDisabled }
            isLoading={ createLoading }
            onSubmit={ createBasket }
          />
        </Drawer>
      </section>
      <section
        className={ styles.Section }
        id={ content.sections[1].id }
      >
        <Title order={ 2 }>{ content.sections[1].title }</Title>
        <Space h="xl" />
        <GridGroup
          data={ basketsHistory } // TODO: data={ basketsContext.accountBaskets }
          isLoading={ isBasketsLoading } // TODO: isLoading={ basketsContext.isLoading
          Item={ Basket }
          itemClassName={ styles.Basket }
          Skeleton={ BasketSkeleton }
        />
      </section>
    </div>
  );
};
export default BakersPage;
