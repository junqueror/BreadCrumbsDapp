import { FC } from 'react';
import { Text } from '@mantine/core';
import classnames from 'classnames';

import styles from './WarningMsg.module.scss';

type Props = {
  className?: string,
  id?: string,
  msg: string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const WarningMsg: FC<Props> = ({ msg, className, id }) => {
  const warningMsgClassNames = classnames(styles.WarningMsg, className);

  return (
    <div
      className={ warningMsgClassNames }
      id={ id }
    >
      <Text>
        { msg }
      </Text>
    </div>
  );
};

WarningMsg.defaultProps = defaultProps;

export default WarningMsg;
