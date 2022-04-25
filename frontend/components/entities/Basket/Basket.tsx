import { FC, MouseEventHandler, useMemo, useState } from 'react';
import {
  Badge, Button, Card,
  Group, Image,
  Modal, RingProgress,
  Space, Table, Text, Title,
} from '@mantine/core';
import classnames from 'classnames';

import Link from 'components/elements/Link';
import BreadBadge from 'components/entities/BreadBadge';
import CrumbLinks from 'components/entities/CrumbLinks';
import config from 'config';
import theme from 'config/theme';
import WEB3 from 'config/web3';
import useAccountContext from 'contexts/account';
import useCrumbs from 'hooks/swr/useCrumbs';
import { CrumbType, PaymentType } from 'types';
import BasketType, { BasketTypeEnum, ObjectiveEnum, PriceTypeEnum } from 'types/BasketType';
import { formatDate } from 'utils/date';
import { percentage } from 'utils/number';

import styles from './Basket.module.scss';

const DEFAULT_CURRENCY = 'BREAD';
const MAX_PAID_PERC_WARNING = 95;
const RING_PROGRESS_SIZE = 80;
const RING_PROGRESS_THICKNESS = 14;

type Props = {
  data: BasketType,
  className?: string,
};

const defaultProps = {
  className: '',
};

const Basket: FC<Props> = ({ data: basket, className }) => {
  const basketClassName = classnames(styles.Basket, className);
  const { data: crumbs = [] }: { data?: CrumbType[]} = useCrumbs(basket.domain);

  const [modalLinkOpened, setLinkModalOpened] = useState(false);
  const { account } = useAccountContext();

  const title = basket.title || basket.domain;

  const toggleLinkModalOpened: MouseEventHandler = event => {
    if (event) event.preventDefault();

    setLinkModalOpened(!modalLinkOpened);
  };

  const closeLinkModal = () => setLinkModalOpened(false);

  const currentDate = new Date();
  const isUpcoming = currentDate < basket.startDate;
  const isFinished = basket.endDate && currentDate > basket.endDate;
  const useBadges = isUpcoming || isFinished;

  const dataTableRows = useMemo(() => {
    const fakeDate = new Date(new Date(currentDate.setHours(8)).setMinutes(0));

    const defaultBasket = {
      type: BasketTypeEnum.Affiliate,
      objective: ObjectiveEnum.Domain,
      priceType: PriceTypeEnum.FixedToken,
      currency: DEFAULT_CURRENCY,
      badget: basket.amount,
      startDate: fakeDate,
      endDate: new Date(new Date(fakeDate
        .setDate(currentDate.getDate() + 60)).setHours(24)),
    };

    const basketData = { ...defaultBasket, ...basket };

    // TODO: Remove default values for real baskets

    const elements = [
      { label: 'Type', value: basketData.type },
      { label: 'Target', value: basketData.domain },
      { label: 'Objective', value: basketData.objective },
      { label: 'Launch date', value: formatDate(basketData.startDate) },
      { label: 'End date', value: formatDate(basketData.endDate) },
      { label: 'Currency', value: basketData.currency === DEFAULT_CURRENCY ? <BreadBadge /> : basketData.currency },
      { label: 'Price type', value: basketData.priceType },
      { label: 'Budget', value: `${basketData.budget} ${basketData.currency}` },
    ];

    return elements.map(element => (
      <tr key={ element.label }>
        <td>{element.label}</td>
        <td>{element.value}</td>
      </tr>
    ));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basket]);

  const { paidPaymentsPerc, paidWarnning } = useMemo(() => {
    const basketPayments: PaymentType[] = (crumbs || [])
      .filter((crumb: CrumbType) => crumb.domain === basket.domain)
      .reduce((allPayments: PaymentType[], crumb: CrumbType) => [
        ...allPayments,
        ...crumb.payments.filter(payment => payment.fromAccount === basket.account),
      ], []);

    if (!basketPayments.length) {
      return ({
        paidPaymentsPerc: 0,
        paidWarnning: false,
      });
    }
    const paidPayments = basketPayments.filter(payment => payment.paid);
    const paidPerc = percentage(paidPayments.length, basketPayments.length);

    return ({
      paidPaymentsPerc: paidPerc,
      paidWarnning: paidPerc < MAX_PAID_PERC_WARNING,
    });
  }, [basket, crumbs]);

  const remainingBudget = Number(basket.budget) - Number(basket.amount);
  const badgetPerc = percentage(Number(basket.amount), Number(basket.budget));
  const badgetWarning = remainingBudget < basket.price;

  const ringsProgessData = [
    {
      label: 'Budget',
      value: badgetPerc,
      color: badgetWarning ? theme.warningColor : String(theme.mantine.primaryColor),
    },
    {
      label: 'Crumbs paid',
      value: paidPaymentsPerc,
      color: paidWarnning ? theme.warningColor : String(theme.mantine.primaryColor),
    },
  ];

  const currencyClassName = classnames(styles.Currency, {
    [styles.WithBadge]: !basket.currency || basket.currency === WEB3.BREADCRUMBS_TOKEN_NAME,
  });
  const showLinkButton = basket.account !== account.address;

  return (
    <>
      <Link
        key={ basket.domain }
        className={ basketClassName }
        isDisabled={ isUpcoming }
        to={ config.routing.paths.basket(basket) }
      >
        <Card padding="xl">
          <Card.Section>
            <Image
              alt={ basket.title }
              className={ styles.Image }
              height={ basket.image ? undefined : 200 }
              src={ basket.image }
              width="100%"
              withPlaceholder
            />
          </Card.Section>
          <Space h="md" />
          <Title className={ styles.Title } order={ 3 }>{ title }</Title>
          <Space h="md" />
          { useBadges && (
            <>
              <Group className={ styles.Badges }>
                { isUpcoming && (
                <Badge
                  variant="outline"
                >
                  UPCOMING
                </Badge>
                ) }
                { isFinished && (
                <Badge
                  color={ theme.warningColor }
                  variant="outline"
                >
                  FINISHED
                </Badge>
                ) }
              </Group>
              <Space h="md" />
            </>
          ) }
          <Text className={ styles.Description }>
            { basket.description }
          </Text>
          <Space h="md" />
          <Table
            className={ styles.DataTable }
            highlightOnHover
            horizontalSpacing={ 0 }
          >
            <tbody>
              { dataTableRows }
            </tbody>
          </Table>
          <Space h="sm" />
          <div className={ styles.Kpis }>
            { ringsProgessData.map(progressData => (
              <div
                key={ `progress-data-${progressData.label}` }
                className={ styles.Kpi }
              >
                <Text className={ styles.Label }>
                  { progressData.label }
                </Text>
                <RingProgress
                  className={ styles.RingProgress }
                  roundCaps
                  sections={ [progressData] }
                  size={ RING_PROGRESS_SIZE }
                  thickness={ RING_PROGRESS_THICKNESS }
                />
              </div>
            )) }
            <div className={ styles.Kpi }>
              <Text className={ styles.Label }>
                Price
              </Text>
              <div className={ styles.Price }>
                <Text className={ styles.Value }>
                  { basket.price }
                </Text>
                <Text className={ currencyClassName }>
                  { !basket.currency || basket.currency === WEB3.BREADCRUMBS_TOKEN_NAME
                    ? <BreadBadge />
                    : basket.currency }
                </Text>
              </div>
            </div>
          </div>
          <Group align="stretch" grow>
            { showLinkButton && (
              <Button
                className={ styles.LinkButton }
                disabled={ !account?.address }
                fullWidth
                variant="outline"
                onClick={ toggleLinkModalOpened }
              >
                Get link
              </Button>
            ) }
          </Group>
        </Card>
      </Link>
      <Modal
        centered
        opened={ modalLinkOpened }
        padding="xl"
        title={ `Your referal link to ${basket.title}` }
        onClose={ closeLinkModal }
      >
        <CrumbLinks domain={ basket.domain } onCopyLink={ closeLinkModal } />
      </Modal>
    </>
  );
};

Basket.defaultProps = defaultProps;

export default Basket;
