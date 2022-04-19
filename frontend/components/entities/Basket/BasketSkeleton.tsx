import { FC } from 'react';
import {
  Card,
  Skeleton,
  Space,
} from '@mantine/core';

import styles from './Basket.module.scss';

type Props = {
  };

const defaultProps = {
};

const BasketSkeleton: FC<Props> = () => (
  <Card className={ styles.Basket }>
    <div>
      <Skeleton height={ 200 } visible width="100%" />
      <Space h="md" />
      <Skeleton height={ 40 } visible width="100%" />
      <Space h="md" />
      <Skeleton height={ 80 } visible width="100%" />
      <Space h="md" />
      <Skeleton height={ 300 } visible width="100%" />
      <Space h="md" />
      <div className={ styles.SkeletonKpis }>
        <div>
          <Skeleton circle height={ 60 } visible width={ 60 } />
        </div>
        <div>
          <Skeleton circle height={ 60 } visible width={ 60 } />
        </div>
        <div>
          <Skeleton height={ 60 } visible width={ 80 } />
        </div>
      </div>
      <Space h="md" />
      <Space h="md" />
      <Skeleton height={ 40 } visible width="100%" />
      <Space h="md" />
    </div>
  </Card>
);

BasketSkeleton.defaultProps = defaultProps;

export default BasketSkeleton;
