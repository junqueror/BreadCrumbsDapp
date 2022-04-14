import { nanoid } from 'nanoid';

import { CrumbType } from 'types';

export type Example = {
  title: string,
  description: string,
  exampleTitle: string[],
  crumb: CrumbType,
}

const currentDate = new Date();

const example: Example = {
  title: 'How It Works',
  description: `A company creates a marketing campaign to attract qualified traffic to its service or product. Publishers redirect traffic to the brand's site through the use of links in exchange for tokens. When the user reaches the target or completes a certain action, a transaction is triggered with the corresponding payment, thus compensating the acquisition of a new potential customer.

  The Breadcrumbs meeting point allows you to negotiate user acquisition targets and rewards.
  
  Let's take an example:`,
  exampleTitle: [
    '1 new user',
    ' = ',
    '0.1 BREAD',
  ],
  crumb: {
    sessionId: nanoid(8),
    domain: 'baker-domain.com',
    date: new Date(),
    payments: [
      {
        fromAccount: '0x0f07a87AAc8F060147b568A10648E94b4B9A6DB2',
        toAccount: '0x53f3ead0230A663542D7f5949D915c4Bf51876eA',
        price: 0.1,
        paid: true,
        date: new Date(currentDate.setSeconds(currentDate.getSeconds() + 60)),
      },
    ],
    paymentsCount: 1,
  },
};

export default example;
