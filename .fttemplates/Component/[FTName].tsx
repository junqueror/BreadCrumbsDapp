import { FC } from 'react';
import classnames from 'classnames';

import styles from './[FTName].module.scss';

type Props = {
  className?: string,
  id?: string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const [FTName]: FC<Props> = ({ className, id }) => {
  const <FTName | camelcase>ClassNames = classnames(styles.[FTName], className);

  return (
    <div
      className={ <FTName | camelcase>ClassNames }
      id={ id }
    >
      [FTName] component
    </div>
  );
};

[FTName].defaultProps = defaultProps;

export default [FTName];
