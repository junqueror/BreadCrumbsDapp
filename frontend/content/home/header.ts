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
  description: 'Breadcrumbs is a new affiliate/referral marketing service that tracks user events and actions on the blockchain. We provide a marketplace for brands and publishers where they can directly negotiate their collaboration. You can check out the meeting point or subscribe to learn about new campaigns.',
  buttons: [{
    text: 'Go to the meeting point',
    href: paths.market,
  },
  {
    text: 'Subscribe to new campaigns',
    href: `#${sections.home.subscription}`,
  }],
};

export default header;
