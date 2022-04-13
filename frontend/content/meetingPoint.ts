import { BasketTypeEnum } from 'types/basketType';

export type MeetingPointSection = {
    title: string,
    description: string,
    basketType: BasketTypeEnum,
}

export type MeetingPoint = {
  title: string,
  sections: MeetingPointSection[],
}

const meetingPoint: MeetingPoint = {
  title: 'meeting point',
  sections: [
    {
      title: 'baskets for affiliates',
      description: 'Marketing campaigns for affiliates',
      basketType: BasketTypeEnum.Affiliate,
    },
    {
      title: 'baskets for referrals',
      description: 'Marketing campaigns for referrals',
      basketType: BasketTypeEnum.Referral,
    },
    {
      title: 'Initial Share Offerings (ISO)',
      description: 'Marketing campaigns to earn tokens from projects on early stages',
      basketType: BasketTypeEnum.ISO,
    },
  ],
};

export default meetingPoint;
