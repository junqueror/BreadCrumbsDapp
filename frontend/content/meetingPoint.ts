import { BasketTypeEnum } from 'types/BasketType';

export type MeetingPointSection = {
    id: string,
    title: string,
    titleXS: string,
    description: string,
    basketType?: BasketTypeEnum,
}

export type MeetingPoint = {
  title: string,
  warning?: string,
  sections: MeetingPointSection[],
}

const meetingPoint: MeetingPoint = {
  title: 'meeting point',
  warning: 'The Breadcrumbs services and the meeting point shown on this page are currently under development. The campaigns and projects shown in this marketplace are not active, and are only shown for the purpose of showing future behavior and testing.',
  sections: [
    {
      id: 'all',
      title: 'all campaigns',
      titleXS: 'all',
      description: 'All paths to achieve the #shareToEarn! Marketing campaigns for affiliation, referrals, influencers, coin offering, token allocations...',
      basketType: undefined,
    },
    {
      id: 'affiliate',
      title: 'baskets for affiliates',
      titleXS: 'affiliates',
      description: `
      With affiliate marketing you can bring people closer to a project or a brand. Share the link to a domain or URL and redirect qualified users. You can make a profit every time a user completes the action specified by the baker. Actions can be a visit to a website, time on page, click on an element, an event trigger...

      As an influencer you can also take advantage of these baskets, as you can convert followers into qualified traffic for other products or services.
      `,
      basketType: BasketTypeEnum.Affiliate,
    },
    {
      id: 'referral',
      title: 'baskets for referrals',
      titleXS: 'referrals',
      description: `Referral marketing allows customers or users to recommend the product or service. It is the most traditional form of word of mouth in the digital world. 

      Pickers are required to be customers or stakeholders of the project, either by verifying that they are token holders, by staking the tokens or by having their account or wallet registered with the project.`,
      basketType: BasketTypeEnum.Referral,
    },
    {
      id: 'iso',
      title: 'Initial Share Offerings (ISO)',
      titleXS: 'ISO',
      description: `Marketing campaigns that work through an initial public coin offering. Share and spread the word about a brand or project through links to earn tokens before a cryptocurrency is released.

      Unlike ICOs, it is not necessary to reach a tier by accumulating tokens. Any user can participate and earn tokens or allocation for the purchase of tokens in early stage projects.`,
      basketType: BasketTypeEnum.ISO,
    },
  ],
};

export default meetingPoint;
