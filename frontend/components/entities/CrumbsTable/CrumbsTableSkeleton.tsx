import { FC } from 'react';
import { Skeleton, Space } from '@mantine/core';

import styles from './CrumbsTable.module.scss';

type Props = {
  };

const defaultProps = {
};

const CrumbsTableSkeleton: FC<Props> = () => (
  <>
    <Skeleton visible />
    <Space h="md" />
    <Skeleton visible />
    <Space h="md" />
    <Skeleton visible />
    <Space h="md" />
    <Skeleton visible />
    <Space h="md" />
    <Skeleton visible />
    <Space h="md" />
    <Skeleton visible />
    <Space h="md" />
    <Skeleton visible />
    <Space h="md" />
  </>

);

CrumbsTableSkeleton.defaultProps = defaultProps;

export default CrumbsTableSkeleton;
