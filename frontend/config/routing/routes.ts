import type RouteType from 'types/routeType';

import paths from './paths';

const routes: {
    home: RouteType,
    market: RouteType,
    baskets: RouteType,
    basket: RouteType,
    crumbs: RouteType,
    crumb: RouteType,
} = {
  home: {
    path: paths.home,
    label: 'Home',
  },
  market: {
    path: paths.market,
    label: 'Meeting point',
  },
  baskets: {
    path: paths.baskets,
    label: 'Bakers',
    isPrivate: false,
  },
  basket: {
    path: paths.basket,
    label: 'Basket',
    isPrivate: false,
  },
  crumbs: {
    path: paths.crumbs,
    label: 'Pickers',
    isPrivate: false,
  },
  crumb: {
    path: paths.crumb,
    label: 'Crumbs',
    isPrivate: false,
  },
};

const navigatorRoutes = [
  routes.market,
  routes.baskets,
  routes.crumbs,
];

export default routes;

export {
  navigatorRoutes,
};
