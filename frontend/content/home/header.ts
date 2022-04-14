import { paths, sections } from 'config/routing';

export type Header = {
  title: string[],
  subtitle: string[],
  description: string,
  buttons: {
    text: string,
    href: string,
  }[],
}

const header: Header = {
  title: ['digital', 'word-of-mouth', 'revolution'],
  subtitle: ['the referral chain made ',
    'simple', ', ', 'open', ' and ', 'reliable'],
  description: 'Breadcrumbs is a new affiliate/referral marketing service that tracks user events and actions over the blockchain. We create a decentralized economy by providing a meeting point for brands and publishers where they can directly negotiate their collaboration. You can check out the meeting point or subscribe to learn about new campaigns.',
  buttons: [
    {
      text: 'Subscribe to new campaigns',
      href: `#${sections.home.subscription}`,
    },
    {
      text: 'Go to the meeting point',
      href: paths.meetingPoint,
    }],
};

export default header;
