import {
  BarChartIcon,
  HandIcon,
  LightningBoltIcon,
  StopwatchIcon,
  TransparencyGridIcon,
} from '@radix-ui/react-icons';

export type KeyPoint = {
  title: string,
  initialValue: number,
  value: number,
  units: string,
  text: string,
}

export type Improvement = {
  title: string,
  tileLabel: string[],
  description: string[],
  highlightWords?: string[],
  Icon: any,
}

export type Benefits = {
  keyPoints: KeyPoint[],
  improvements: Improvement[],
}

const players: Benefits = {
  keyPoints: [{
    title: 'fees',
    initialValue: 70,
    value: 1,
    units: '%',
    text: `Reduce costs, increase ROI!
    Up to 30 times cheaper than affiliate platforms, which set their fees at around 25-30%.
    `,
  },
  {
    title: 'tracking',
    initialValue: 0,
    value: 100,
    units: '% events',
    text: `Increase profits!
    All user events and actions are logged in the network and cannot be changed. The publisher receives payment for all achieved goals.`,
  },
  ],
  improvements: [
    {
      title: 'transparent',
      tileLabel: ['transparent'],
      description: ['The Breadcrumbs project aims to narrow the gap between affiliates/referrals/publishers and advertisers. By eliminating intermediate platforms and using smart contracts, it aims to achieve a more direct relationship between the participants in marketing relationships.',
        'This will improve the service by reducing bureaucracy, misunderstandings, fraud, inconsistency between traffic data from both parties, fake operations ...'],
      highlightWords: ['eliminating intermediate platforms', 'direct relatioships', 'reducing bureaucracy', 'misunderstandings', 'fraud', 'inconsistency', 'fake operations'],
      Icon: TransparencyGridIcon,
    },
    {
      title: 'reliable',
      tileLabel: ['reliable'],
      description: ['Blockchain technology is proving to be very useful in tracking physical and digital assets. At Breadcrumbs we are confident that it can substantially improve the tracking of users, sessions and actions in the digital world.',
        'Decentralization allows a high increase in the reliability of tracking systems. This allows to forget about a very common problem in affiliate marketing, the inconsistency of tracking data and the consequent loss of transactions and profits for affiliates.'],
      highlightWords: ['tracking', 'digital world', 'increase in the reliability', 'tracking systems'],
      Icon: LightningBoltIcon,
    },
    {
      title: 'minimum commissions',
      tileLabel: ['minimum', 'commissions'],
      description: ['The simplification of the service and infrastructure is evident, and allows to reduce costs in the service. The rapprochement between publishers and advertisers comes from the narrowing of the intermediary between them. Bradcrumbs is only in charge of providing the infrastructure between players, but does not interfere in their negotiations.',
        'This translates into a high reduction of the service fee. Costs for advertisers are reduced, while publishers can increase their profits.'],
      highlightWords: ['costs', 'reduced', 'increase', 'profits'],
      Icon: BarChartIcon,
    },
    {
      title: 'open to everyone',
      tileLabel: ['everyone', 'open to'],
      description: ['Breadcrumbs aims to democratize affiliate and referral services. Anyone can use word of mouth in the digital world and generate revenue by promoting a brand, website or encouraging users to perform an action.',
        'Access to the application is as simple as connecting a wallet, generate a link and start sharing. This also increases the number of affiliates/referrals for advertisers, thus increasing their business volume.'],
      highlightWords: ['generate revenue', 'connecting a wallet', 'generate a link', 'start sharing'],
      Icon: HandIcon,
    },
    {
      title: 'instant payments',
      tileLabel: ['instant', 'payments'],
      description: ['The use of the BREAD token, or other tokens, allow to transact over blockchain. This allows to achieve simplification of payments and allows affiliates/referrals to receive payments in real time.',
        'When a user performs the action defined in the campaign (basket), a breadcrumb is generated. This is a new record in the blockchain that triggers the corresponding payment at the same instant.'],
      highlightWords: ['BREAD token', 'payments', 'real time', 'same instant'],
      Icon: StopwatchIcon,
    },
  ],
};

export default players;
