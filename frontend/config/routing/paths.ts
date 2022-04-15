import { BasketType } from 'types';

const paths = {
  home: '/',
  meetingPoint: '/meeting-point',
  bakers: '/bakers',
  basket: (basket: BasketType) => `bakers/baskets/${basket.domain}`,
  pickers: '/pickers',
  crumb: (domain: string, account: string) => `pickers/crumbs/${domain}/${account}`,
  shortLink: (shortId: string) => `pickers/crumbs/${shortId}`,
};

export default paths;
