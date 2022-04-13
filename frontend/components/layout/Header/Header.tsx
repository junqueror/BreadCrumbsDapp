import { FC, MouseEventHandler } from 'react';
import {
  Burger,
  Button,
  Drawer,
  Grid,
  Group,
  Header as MantineHeader,
  MediaQuery,
  Text,
} from '@mantine/core';
import { CardStackIcon } from '@radix-ui/react-icons';

import Link from 'components/elements/Link';
import { Account, Address } from 'components/entities';
import config from 'config';
import { paths, sections } from 'config/routing';
import theme from 'config/theme';
import useAccountContext from 'contexts/account';
import { useToggleOpened } from 'hooks';

import Navigator from '../Navigator';

import styles from './Header.module.scss';

interface Props {
  isBurgerOpened: boolean,
  onBurgerClick: MouseEventHandler,
}

const defaultProps = {
  isBurgerOpened: false,
  onBurgerClick: () => {},
};

const Header: FC<Props> = ({ isBurgerOpened, onBurgerClick }: Props) => {
  const { account, login, disabled, isLoading } = useAccountContext();

  const {
    opened: accountDrawerOpened,
    open: openAccountDrawer,
    close: closeAccountDrawer,
  } = useToggleOpened();

  const loginButtonClickHandler: MouseEventHandler = () => {
    login();
    openAccountDrawer();
  };

  const isLogged = !!account?.address;
  const buttonHandler = isLogged ? openAccountDrawer : loginButtonClickHandler;

  return (
    <MantineHeader height={ 80 } padding="lg">
      <Grid
        align="center"
        className={ styles.Header }
        columns={ 24 }
        gutter="xs"
        justify="space-between"
      >
        <MediaQuery largerThan="sm" styles={ { display: 'none' } }>
          <Grid.Col span={ 1 }>
            <Burger
              className={ styles.Burger }
              mr="xl"
              opened={ isBurgerOpened }
              size="sm"
              onClick={ onBurgerClick }
            />
          </Grid.Col>
        </MediaQuery>
        <Grid.Col md={ 4 } sm={ 4 } span={ 7 }>
          <Link to={ paths.home }>
            <Group
              align="baseline"
              direction="row"
              spacing={ 0 }
            >
              <div className={ styles.Title }>
                <Text
                  align="center"
                  className={ styles.Text }
                  component="span"
                  gradient={ theme.accentGradient }
                  size="xl"
                  style={ { fontFamily: 'Blessed Light' } }
                  transform="lowercase"
                  variant="gradient"
                >
                  { config.site.NAME.split(' ')[0] }
                </Text>
                <Text
                  align="center"
                  className={ styles.Text }
                  component="span"
                  gradient={ theme.accentGradient }
                  size="xs"
                  style={ { fontFamily: 'Blessed Light' } }
                  transform="lowercase"
                  variant="gradient"
                >
                  { config.site.NAME.split(' ')[1] }
                </Text>
              </div>
            </Group>
          </Link>
        </Grid.Col>
        <MediaQuery smallerThan="sm" styles={ { display: 'none' } }>
          <Grid.Col sm={ 20 } span={ 6 }>
            <div>
              <Navigator />
            </div>
          </Grid.Col>
        </MediaQuery>
        <Grid.Col className={ styles.Buttons } lg={ 6 } sm={ 6 } span={ 11 }>
          <Link
            className={ styles.SubscriptionButton }
            isButton
            to={ `#${sections.home.subscription}` }
            variant="outline"
          >
            Subscribe
          </Link>
          <Button
            className={ styles.LoginButton }
            disabled={ disabled }
            leftIcon={ isLogged && <CardStackIcon /> }
            loading={ isLoading }
            variant="outline"
            onClick={ buttonHandler }
          >
            { isLogged
              ? (
                <MediaQuery smallerThan="sm" styles={ { display: 'none' } }>
                  <Address>{account?.address}</Address>
                </MediaQuery>
              ) : 'Login'}
          </Button>
        </Grid.Col>
      </Grid>
      <Drawer
        opened={ accountDrawerOpened }
        padding="xs"
        size="md"
        onClose={ closeAccountDrawer }
      >
        <Account onLogout={ closeAccountDrawer } />
      </Drawer>
    </MantineHeader>
  );
};

Header.defaultProps = defaultProps;

export default Header;
