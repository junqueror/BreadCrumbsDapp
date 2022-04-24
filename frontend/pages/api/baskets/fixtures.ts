import type { NextApiRequest, NextApiResponse } from 'next';

import config from 'config';
import { api } from 'config/routing';
import BasketType, { BasketTypeEnum, ObjectiveEnum, PriceTypeEnum } from 'types/BasketType';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80';
const BREADCRUMBS_IMAGE = '/static/images/home/page-background.jpg';

export type BasketDataType = Omit<BasketType, 'startDate' | 'endDate'> & {
  startDate: string,
  endDate: string | null,
};

export type Data = {
  baskets: BasketDataType[]
}

export const path = api.basketsFixtures;

export const initialData: BasketDataType[] = [{
  title: 'gamium - the center of the metaverse',
  account: '0xFeefEa490f9075E2eC50A82a6FE52bB7D9e842Df',
  domain: 'gamium.io',
  image: 'https://gamium.world/images/carousel_1.jpg',
  description: 'Gamium is the first Decentralized Social Metaverse that interconnects all Metaverses. Thanks to web3, Gamium unites different virtual worlds where your Avatar\'s dreams come true: the only limit is your imagination.',
  type: BasketTypeEnum.Affiliate,
  startDate: String(new Date(2022, 1, 8)),
  endDate: String(new Date(2022, 12, 31)),
  objective: ObjectiveEnum.Domain,
  currency: 'BREAD',
  priceType: PriceTypeEnum.FixedToken,
  budget: 20000,
  amount: 0,
  price: 1,
},
{
  title: 'gamium',
  account: '0xFeefEa490f9075E2eC50A82a6FE52bB7D9e842Df',
  domain: 'pancakeswap.finance',
  image: 'https://gamium.world/images/carousel_1.jpg',
  description: 'Gamium is the first Decentralized Social Metaverse that interconnects all Metaverses. Thanks to web3, Gamium unites different virtual worlds where your Avatar\'s dreams come true: the only limit is your imagination.',
  type: BasketTypeEnum.ISO,
  startDate: String(new Date(2022, 5, 1)),
  endDate: String(new Date(2022, 7, 31)),
  objective: ObjectiveEnum.URL,
  currency: 'GMM',
  priceType: PriceTypeEnum.FixedUSD,
  budget: 10000,
  amount: 0,
  price: 0.01,
},
{
  title: 'breadcrumbs',
  account: '0xFfCf63a23b3aD0365fd9248360682a8D550d70Ee',
  domain: config.site.DOMAIN,
  image: BREADCRUMBS_IMAGE,
  description: 'The BreadCrumbs network is the first blockchain service that creates a meetingPoint and a decentralized economy to provide affiliation/referal programs without limits',
  type: BasketTypeEnum.Referral,
  startDate: String(new Date(2023, 6, 1)),
  endDate: null,
  objective: ObjectiveEnum.Domain,
  currency: 'BREAD',
  priceType: PriceTypeEnum.FixedToken,
  budget: 500000,
  amount: 500000,
  price: 10,
},
{
  title: 'breadcrumbs telegram',
  account: '0xFfCf63a23b3aD0365fd9248360682a8D550d70Ee',
  domain: 't.me',
  image: BREADCRUMBS_IMAGE,
  description: 'The Breadcrumbs community in Spanish, on the Telegram platform. News, events, polls, discussion and much more.',
  type: BasketTypeEnum.ISO,
  startDate: String(new Date(2022, 6, 1)),
  endDate: String(new Date(2022, 12, 31)),
  objective: ObjectiveEnum.Domain,
  currency: 'BREAD',
  priceType: PriceTypeEnum.FixedUSD,
  budget: 500,
  amount: 420.840,
  price: 0.001,
},
{
  title: 'breadcrumbs',
  account: '0xFfCf63a23b3aD0365fd9248360682a8D550d70Ee',
  domain: config.site.DOMAIN,
  image: BREADCRUMBS_IMAGE,
  description: 'The BreadCrumbs network is the first blockchain service that creates a meetingPoint and a decentralized economy to provide affiliation/referal programs without limits',
  type: BasketTypeEnum.ISO,
  startDate: String(new Date(2023, 1, 1)),
  endDate: String(new Date(2023, 5, 31)),
  objective: ObjectiveEnum.Domain,
  currency: 'BREAD',
  priceType: PriceTypeEnum.FixedUSD,
  budget: 500,
  amount: 0,
  price: 0.002,
},
{
  title: 'test',
  account: '0xFfCf63a23b3aD0365fd9248360682a8D550d70Ee',
  domain: 'test.com',
  image: DEFAULT_IMAGE,
  description: 'A basket created for testing purposes',
  type: BasketTypeEnum.Affiliate,
  startDate: String(new Date(2022, 1, 1)),
  endDate: String(new Date(2022, 6, 30)),
  objective: ObjectiveEnum.Click,
  currency: 'BREAD',
  priceType: PriceTypeEnum.FixedToken,
  budget: 100000,
  amount: 99500,
  price: 10,
}];

export const get = async (): Promise<BasketDataType[]> => {
  const res = await fetch(api.basketsFixtures);
  const data: { baskets: BasketDataType[] } = await res.json();

  return data.baskets || [];
};

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  res.status(200).json({
    baskets: initialData.map(basket => ({
      ...basket,
      endDate: basket.endDate || null,
    })),
  });
};

export default handler;
