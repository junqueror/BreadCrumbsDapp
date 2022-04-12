import styles from 'components/pages/home/sections/WhatIsSection/WhatIsSection.module.scss';

export type WhatIsCard = {
  topTitle: string,
  title: string[],
  text: string,
  keyPoints: string[],
  imageClassName?: string,
}

const whatIs: WhatIsCard[] = [
  {
    topTitle: 'the destination',
    title: ['promote your brand,', 'share to earn'],
    text: 'Breadcrumbs is a new digital meeting point for all players involved in affiliate, referral or influencer marketing. We want to improve and increase the affiliate/referal relationships betweeen company/brands and publishers/influences/marketers.',
    keyPoints: ['Fast growth for your brand', 'Boost your projects and services', 'Earn BREAD tokens by sharing with links'],
    imageClassName: styles.ShareClip,
  },
  {
    topTitle: 'the path',
    title: ['blockchain for tracking,', 'contracts for players'],
    text: 'Breadcrumbs uses the power of the blockchain technoogy to provide highly reliable and transparent tracking of user actions and events. It also works as a decentralized application, allowing brands and affiliates to interact directly, thus improving relationships and eliminating third parties.',
    keyPoints: ['Save on fees', 'Share without limits'],
    imageClassName: styles.Tiles,
  },
  {
    topTitle: 'the first tep',
    title: ['Initial Shared Offering (ISO)'],
    text: 'ISOs are a new process of crowd-funding in the cryptocurrency industry’s. They work through an initial public coin offering for those first interested to help promoting a project or brand.',
    keyPoints: ['Motivate your community to spread the project by offering coin or tokens.', 'Share a project website to earn tokens or allocation to invest in early stages', 'Check the first ISO for Breadcrumbs project!'],
    imageClassName: styles.BreadClip,
  },
];

export default whatIs;
