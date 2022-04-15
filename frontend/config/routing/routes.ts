import type RouteType from 'types/routeType';

import paths from './paths';

const routes: {
    home: RouteType,
    meetingPoint: RouteType,
    baskets: RouteType,
    basket: RouteType,
    crumbs: RouteType,
    crumb: RouteType,
} = {
  home: {
    path: paths.home,
    label: 'Home',
  },
  meetingPoint: {
    path: paths.meetingPoint,
    label: 'Meeting point',
  },
  baskets: {
    path: paths.bakers,
    label: 'Bakers',
    isPrivate: false,
  },
  basket: {
    path: paths.basket,
    label: 'Basket',
    isPrivate: false,
  },
  crumbs: {
    path: paths.pickers,
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
  routes.meetingPoint,
  routes.baskets,
  routes.crumbs,
];

export default routes;

export {
  navigatorRoutes,
};
