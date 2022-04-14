import { FC } from 'react';
import { Space, Text, Title } from '@mantine/core';
import classnames from 'classnames';

import Basket, { BasketSkeleton } from 'components/entities/Basket';
import GridGroup from 'components/groups/GridGroup';
import { BasketType } from 'types';

import styles from './BasketsSection.module.scss';

type Props = {
  title: string,
  baskets?: BasketType[],
  className?: string,
  description?: string,
  id?: string,
  isLoading?: boolean,
};

const defaultProps = {
  baskets: [],
  className: '',
  description: '',
  id: undefined,
  isLoading: false,
};

const BasketsSection: FC<Props> = ({
  title, baskets, className, description, id, isLoading,
}) => {
  const basketsSectionClassNames = classnames(styles.BasketsSection, className);

  return (
    <section
      className={ basketsSectionClassNames }
      id={ id }
    >
      <Space h="xl" />
      <Title order={ 2 }>{ title }</Title>
      <Space h="xs" />
      <Text className={ styles.Description }>{ description }</Text>
      <Space h="xl" />
      <Space h="xl" />
      <GridGroup
        data={ baskets || [] }
        isLoading={ isLoading }
        Item={ Basket }
        itemClassName={ styles.Basket }
        Skeleton={ BasketSkeleton }
      />
    </section>
  );
};

BasketsSection.defaultProps = defaultProps;

export default BasketsSection;
