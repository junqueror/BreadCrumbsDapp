import { FC, useMemo } from 'react';
import { Table } from '@mantine/core';
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';
import classnames from 'classnames';

import Address from 'components/entities/Address';
import { CrumbType, PaymentType } from 'types';
import { formatDate } from 'utils/date';

import CrumbsTableSkeleton from './CrumbsTableSkeleton';

import styles from './CrumbsTable.module.scss';

const TABLE_HEADERS = [
  'date', 'from account', 'to account', 'sessionID', 'price', 'paid',
];

type CrumbPayment = PaymentType & { sessionId: string };

type Props = {
  crumbs?: CrumbType[],
  className?: string,
  id?: string,
  isLoading?: boolean,
};

const defaultProps = {
  crumbs: [],
  className: '',
  id: undefined,
  isLoading: false,
};

const CrumbsTable: FC<Props> = ({ crumbs = defaultProps.crumbs, className, id, isLoading }) => {
  const crumbsTableClassNames = classnames(styles.CrumbsTable, className);

  const dataTableRows = useMemo(() => {
    const crumbPayments: CrumbPayment[] = crumbs.reduce((payments: CrumbPayment[], crumb: CrumbType) => [
      ...payments,
      ...(crumb.payments || []).map(payment => ({
        sessionId: crumb.sessionId,
        ...payment,
      })),
    ], []);

    return crumbPayments.map(crumbPayment => (
      <tr
        key={ `crumb-${crumbPayment.sessionId}-${crumbPayment.fromAccount}` }
        className={ classnames({ [styles.Warning]: !crumbPayment.paid }) }
      >
        <td>{ formatDate(crumbPayment.date) }</td>
        <td>
          <Address>
            { crumbPayment.fromAccount }
          </Address>
        </td>
        <td>
          <Address>
            { crumbPayment.toAccount }
          </Address>
        </td>
        <td>{ crumbPayment.sessionId }</td>
        <td>{ crumbPayment.price }</td>
        <td>{ crumbPayment.paid ? <CheckIcon /> : <Cross1Icon /> }</td>
      </tr>
    ));
  }, [crumbs]);

  return (
    <div
      className={ crumbsTableClassNames }
      id={ id }
    >
      <Table
        className={ styles.Table }
        highlightOnHover
        horizontalSpacing={ 0 }
      >
        <caption>Bread crumb transactions</caption>
        <thead>
          <tr>
            { TABLE_HEADERS.map((header: string) => (
              <td key={ header }>{ header }</td>
            )) }
          </tr>
        </thead>
        <tbody>
          { dataTableRows }
        </tbody>
        { isLoading && <CrumbsTableSkeleton /> }
      </Table>
    </div>
  );
};

CrumbsTable.defaultProps = defaultProps;

export default CrumbsTable;
