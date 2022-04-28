import type RouteType from 'types/RouteType';

import paths from './paths';

const routes: {
    home: RouteType,
    meetingPoint: RouteType,
    bakers: RouteType,
    basket: RouteType,
    pickers: RouteType,
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
  bakers: {
    path: paths.bakers,
    label: 'Bakers',
    isPrivate: false,
  },
  basket: {
    path: paths.basket,
    label: 'Basket',
    isPrivate: false,
  },
  pickers: {
    path: paths.pickers,
    label: 'Pickers',
    isPrivate: false,
  },
  crumb: {
    path: paths.link,
    label: 'Crumbs',
    isPrivate: false,
  },
};

const navigatorRoutes = [
  routes.meetingPoint,
  routes.bakers,
  routes.pickers,
];

export default routes;

export {
  navigatorRoutes,
};
