import type { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';

import { api } from 'config/routing';
import { CrumbType, PaymentType } from 'types';

export type CrumbDataType = Omit<CrumbType, 'date'> & {
  date: string,
  payments: Omit<PaymentType, 'date'> & {
    date: string,
  }[],
};

export type Data = {
  crumbs: CrumbDataType[]
}

export const path = api.basketsFixtures;

const currentDate = new Date();
const getDateBeforeDays = (days: number): Date => new Date(new Date(currentDate
  .setDate(currentDate.getDate() - days))
  .setSeconds(Math.random() * 86400));

export const initialData: CrumbType[] = [{
  sessionId: nanoid(8),
  date: getDateBeforeDays(5),
  domain: 'bread-crumbs.tech',
  payments: [
    {
      fromAccount: '0x9944C8a8b51e383eA709ef236Ad8A4667f3298c6',
      toAccount: '0xFfCf63a23b3aD0365fd9248360682a8D550d70Ee',
      price: 0.2,
      paid: true,
      date: getDateBeforeDays(5),
    },
  ],
  paymentsCount: 1,
},
{
  sessionId: nanoid(8),
  date: getDateBeforeDays(4),
  domain: 'bread-crumbs.tech',
  payments: [
    {
      fromAccount: '0x9944C8a8b51e383eA709ef236Ad8A4667f3298c6',
      toAccount: '0xFfCf63a23b3aD0365fd9248360682a8D550d70Ee',
      price: 0.2,
      paid: true,
      date: getDateBeforeDays(4),
    },
    {
      fromAccount: '0xf9F564922B9fd49327679d11B9f3741fEA048505',
      toAccount: '0xFfCf63a23b3aD0365fd9248360682a8D550d70Ee',
      price: 0.2,
      paid: false,
      date: getDateBeforeDays(4),
    },
  ],
  paymentsCount: 2,
},
{
  sessionId: nanoid(8),
  date: getDateBeforeDays(4),
  domain: 'bread-crumbs.tech',
  payments: [
    {
      fromAccount: '0xA51dA7E6148B8EF47eEa55BCeFFc9A67D7ef274C',
      toAccount: '0xFfCf63a23b3aD0365fd9248360682a8D550d70Ee',
      price: 0.2,
      paid: true,
      date: getDateBeforeDays(4),
    },
  ],
  paymentsCount: 1,
},
{
  sessionId: nanoid(8),
  date: getDateBeforeDays(2),
  domain: 'bread-crumbs.tech',
  payments: [
    {
      fromAccount: '0xf9F564922B9fd49327679d11B9f3741fEA048505',
      toAccount: '0xFfCf63a23b3aD0365fd9248360682a8D550d70Ee',
      price: 0.2,
      paid: true,
      date: getDateBeforeDays(2),
    },
  ],
  paymentsCount: 1,
},
{
  sessionId: nanoid(8),
  date: getDateBeforeDays(1),
  domain: 'bread-crumbs.tech',
  payments: [
    {
      fromAccount: '0x9944C8a8b51e383eA709ef236Ad8A4667f3298c6',
      toAccount: '0xFfCf63a23b3aD0365fd9248360682a8D550d70Ee',
      price: 0.2,
      paid: true,
      date: getDateBeforeDays(1),
    },
  ],
  paymentsCount: 1,
},
{
  sessionId: nanoid(8),
  date: currentDate,
  domain: 'bread-crumbs.tech',
  payments: [
    {
      fromAccount: '0xf9F564922B9fd49327679d11B9f3741fEA048505',
      toAccount: '0xFfCf63a23b3aD0365fd9248360682a8D550d70Ee',
      price: 0.2,
      paid: false,
      date: currentDate,
    },
  ],
  paymentsCount: 1,
},
];

export const get = async (): Promise<CrumbType[]> => {
  const res = await fetch(api.crumbsFixtures);
  const data: { crumbs: CrumbType[] } = await res.json();

  return (data.crumbs || []).map(crumb => ({
    ...crumb,
    date: new Date(crumb.date),
    payments: crumb.payments.map(payment => ({
      ...payment,
      date: new Date(payment.date),
    })),
  }));
};

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  res.status(200).json({
    crumbs: initialData.map(crumb => ({
      ...crumb,
      date: String(crumb.date),
      payments: crumb.payments.map(payment => ({
        ...payment,
        date: String(payment.date),
      })),
    })),
  });
};

export default handler;
