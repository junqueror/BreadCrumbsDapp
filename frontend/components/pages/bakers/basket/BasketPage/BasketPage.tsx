/* eslint-disable react/forbid-dom-props */
import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Button,
  Group,
  LoadingOverlay, Modal, Space, Tabs,
  Text, Title, Transition,
} from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import useSWR from 'swr';

import { WarningMsg } from 'components/elements';
import { Basket, CrumbsTable } from 'components/entities';
import BasketForm from 'components/forms/BasketForm';
import CrumbsTimeLine from 'components/groups/CrumbsTimeLine';
import { paths } from 'config/routing';
import theme from 'config/theme';
import { basket as content } from 'content';
import useAccountContext from 'contexts/account';
import useBasketContext from 'contexts/basket/basketContext';
import useCrumbsContext from 'contexts/crumbs/crumbsContext';
import { useToggleOpened } from 'hooks';
import * as crumbsFixturesRequest from 'pages/api/crumbs/fixtures';
import { BasketType } from 'types';

import styles from './BasketPage.module.scss';

const BasketPage: NextPage = () => {
  const router = useRouter();
  const { domain } = router.query;
  const { account } = useAccountContext();
  const basketContext = useBasketContext();
  const crumbsContext = useCrumbsContext();
  const { crumbs, isLoading: isGetCrumbsLoading } = crumbsContext;
  const { basket, error: getBasketError }: { basket: BasketType, error: string } = basketContext;
  const notifications = useNotifications();

  const {
    data: fixtureCrumbs = [],
    error: fixtureCrumbsError,
  } = useSWR(crumbsFixturesRequest.path, crumbsFixturesRequest.get);

  const allCrumbs = [
    ...fixtureCrumbs,
    ...crumbs,
  ];

  const isFixtureCrumbsLoading = !fixtureCrumbs && !fixtureCrumbsError;
  const isCrumbsLoading = isGetCrumbsLoading || isFixtureCrumbsLoading;

  const {
    opened: editOpened,
    open: openEdit,
    close: closeEdit,
  } = useToggleOpened();
  const {
    opened: deleteOpened,
    open: openDelete,
    close: closeDelete,
  } = useToggleOpened();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string>();
  const [deleteError, setDeleteError] = useState<string>();

  const updateDisabled = !account.address;
  const deleteDisabled = updateDisabled;

  const updateBasket = useCallback(async (values: {
    domain: string,
    amount: any,
    price: any,
  }) => {
    setDeleteError(undefined);

    if (values.domain === basket?.domain
      && values.amount === basket?.amount
      && values.price === basket?.price) {
      setUpdateError(undefined);
      closeEdit();
      return;
    }

    setUpdateLoading(true);

    basketContext.updateBasket(values.domain, values.amount, values.price)
      .then(() => {
        setUpdateLoading(false);
        setUpdateError(undefined);
        closeEdit();
        notifications.showNotification({
          title: 'Basket update',
          message: `'${basket?.domain}' basket values were updated`,
          color: 'green',
        });
      }).catch((_error: Error) => {
        setUpdateError(_error.message);
        setUpdateLoading(false);
        notifications.showNotification({
          title: 'Basket was not deleted',
          message: `Error updating the basket?. '${basket?.domain}' basket values were not updated`,
          color: 'red',
        });
      });
  }, [basketContext, basket, closeEdit, notifications]);

  const deleteBasket = () => basketContext.deleteBasket(String(domain))
    .then(() => {
      router.push(paths.bakers);
      setDeleteError(undefined);
      closeDelete();
      notifications.showNotification({
        title: 'Basket delete',
        message: `'${basket?.domain}' basket is no longer available`,
        color: 'green',
      });
    })
    .catch((_error: Error) => {
      setDeleteError(_error.message);
      closeDelete();
      notifications.showNotification({
        title: 'Basket was not deleted',
        message: `Error deleting the basket?. '${basket?.domain}' basket is still available`,
        color: 'red',
      });
    });

  useEffect(() => {
    crumbsContext.setDomain(domain);
    basketContext.setDomain(domain);
  }, [crumbsContext, basketContext, domain]);

  const showCrumbs = (!!basket && !!crumbs);

  return (
    <div className={ styles.BasketPage }>
      { !!content.warning && (
        <WarningMsg msg={ content.warning } />
      ) }
      <Space h="xl" />
      <Title order={ 1 }>{ content.title }</Title>
      <Space h="xl" />
      <div className={ styles.Content }>
        <section className={ styles.Basket }>
          <Space h="xl" />
          <div className={ styles.BasketData }>
            <LoadingOverlay visible={ basketContext.isLoading } />
            <Transition
              duration={ theme.transitionDuration }
              mounted={ !editOpened }
              transition="fade"
            >
              { style => (
                <div style={ style }>
                  { basket && (
                    <Basket
                      className={ styles.Basket }
                      data={ basket }
                    />
                  ) }
                  <Space h="sm" />
                  <div className={ styles.Controller }>
                    <Text color="red" mt="sm" size="sm">
                      { deleteError }
                    </Text>
                    <Button
                      color={ theme.deleteColor }
                      disabled={ deleteDisabled }
                      variant="outline"
                      onClick={ openDelete }
                    >
                      { content.deleteButton }
                    </Button>
                    <Button
                      disabled={ updateDisabled }
                      variant="outline"
                      onClick={ openEdit }
                    >
                      { content.editButton }
                    </Button>
                  </div>
                </div>
              ) }
            </Transition>
            <Transition
              duration={ theme.transitionDuration }
              mounted={ editOpened }
              transition="fade"
            >
              { style => (
                <div style={ style }>
                  <BasketForm
                    basket={ basket }
                    error={ updateError }
                    isDisabled={ updateDisabled }
                    isLoading={ updateLoading }
                    onSubmit={ updateBasket }
                  />
                </div>
              ) }
            </Transition>
            { !!getBasketError && <Text color="red">{ String(getBasketError) }</Text> }
            <Modal
              centered
              opened={ deleteOpened }
              title={ `Delete basket with domain ${basket?.domain}` }
              onClose={ closeDelete }
            >
              <Group mt="xl" position="right">
                <Button
                  variant="outline"
                  onClick={ closeDelete }
                >
                  { content.cancelButton }
                </Button>
                <Button
                  gradient={ theme.deleteGradient }
                  variant="gradient"
                  onClick={ deleteBasket }
                >
                  { content.deleteButton }
                </Button>
              </Group>
            </Modal>
          </div>
        </section>
        <section>
          { showCrumbs && (
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
          ) }
        </section>
        { /* !!getCrumbsError && <Text color="red">{ String(getCrumbsError) }</Text> */}
      </div>
    </div>
  );
};

export default BasketPage;
