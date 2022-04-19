import { FC } from 'react';
import { Divider, Drawer, Space } from '@mantine/core';

import { Account } from 'components/entities';
import useAccountContext from 'contexts/account/accountContext';

import Navigator from '../Navigator';

import styles from './Navbar.module.scss';

interface Props {
  isOpened: boolean,
  onClose(): void,
}

const defaultProps = {
  isOpened: false,
};

const Navbar: FC<Props> = ({ isOpened, onClose }) => {
  const { account } = useAccountContext();

  return (
    <Drawer
      className={ styles.Navbar }
      opened={ isOpened }
      padding="xl"
      size="md"
      onClose={ onClose }
    >
      { account.address && (
      <>
        <Account />
        <Divider />
      </>
      ) }
      <Space h="xl" />
      <Navigator className={ styles.Navigator } />
    </Drawer>
  );
};

Navbar.defaultProps = defaultProps;

export default Navbar;
