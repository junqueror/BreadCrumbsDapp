import { FC, ReactNode } from 'react';
import classnames from 'classnames';

import styles from './CrumbLayout.module.scss';

type Props = {
  className?: string,
  id?: string,
  children: ReactNode,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const CrumbLayout: FC<Props> = ({ children, className, id }) => {
  const crumbLayoutClassNames = classnames(styles.CrumbLayout, className);

  return (
    <div
      className={ crumbLayoutClassNames }
      id={ id }
    >
      { children }
    </div>
  );
};

CrumbLayout.defaultProps = defaultProps;

export default CrumbLayout;
