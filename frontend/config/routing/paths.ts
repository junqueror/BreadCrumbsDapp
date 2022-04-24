import { BasketType } from 'types';

const paths = {
  home: '/',
  meetingPoint: '/meeting-point',
  bakers: '/bakers',
  basket: (basket: BasketType) => `bakers/baskets/${basket.domain}`,
  pickers: '/pickers',
  link: (domain: string, account: string) => `crumb/${domain}/${account}`,
  shortLink: (shortId: string) => `c/${shortId}`,
};

export default paths;
