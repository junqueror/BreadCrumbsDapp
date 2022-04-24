import { FC } from 'react';
import { Group } from '@mantine/core';

import Link from 'components/elements/Link';
import { navigatorRoutes } from 'config/routing/routes';
import useAccountContext from 'contexts/account/accountContext';

import styles from './Navigator.module.scss';

type Props = {
  className?: string,
};

const defaultProps = {
  className: '',
};

const Navigator: FC<Props> = ({ className }) => {
  const { account } = useAccountContext();

  return (
    <div key="navLinks" className={ styles.Navigator }>
      <Group className={  className } position="right" spacing="xl">
        { navigatorRoutes.map(route => (
          <div key={ `nav-${route.path}` }>
            <Link
              className={ styles.NavLink }
              isButton
              isDisabled={ route.isPrivate && !account?.address }
              to={ String(route.path) }
            >
              { route.label }
            </Link>
          </div>
        ))}
      </Group>
    </div>
  );
};

Navigator.defaultProps = defaultProps;

export default Navigator;
