import { BasketType } from 'types';

const paths = {
  home: '/',
  meetingPoint: '/meeting-point',
  baskets: '/baskets',
  basket: (basket: BasketType) => `/baskets/${basket.domain}`,
  crumbs: '/crumbs',
  crumb: (domain: string, account: string) => `/crumbs/${domain}/${account}`,
  shortLink: (shortId: string) => `/crumbs/${shortId}`,
};

export default paths;
