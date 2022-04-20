import { FC } from 'react';
import { Text } from '@mantine/core';
import classnames from 'classnames';

import styles from './ErrorMsg.module.scss';

type Props = {
  msg?: string,
  className?: string,
  id?: string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const ErrorMsg: FC<Props> = ({ msg, className, id }) => {
  const errorMsgClassNames = classnames(styles.ErrorMsg, className);

  return (
    <div
      className={ errorMsgClassNames }
      id={ id }
    >
      <Text color="red" mt="sm" size="sm">
        { msg }
      </Text>
    </div>
  );
};

ErrorMsg.defaultProps = defaultProps;

export default ErrorMsg;
