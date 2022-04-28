const PUBLIC_FRONTEND_HOST = process.env.NEXT_PUBLIC_FRONTEND_HOST;
const PUBLIC_FRONTEND_PORT = Number(process.env.NEXT_PUBLIC_FRONTEND_PORT);
const protocol = process.env.NEXT_PUBLIC_ENV === 'local' ? 'http' : 'https';

const site = {
  DOMAIN: 'bread-crumbs.tech',
  BASE_URL: PUBLIC_FRONTEND_PORT
    ? `${protocol}://${PUBLIC_FRONTEND_HOST}:${PUBLIC_FRONTEND_PORT}`
    : `${protocol}://${PUBLIC_FRONTEND_HOST}`,
  NAME: 'Bread Crumbs',
  TITLE: 'Bread Crumbs: the referral chain made simple, open and reliable',
  DESCRIPTION: 'Breadcrumbs is a new affiliate/referral marketing service that tracks user events and actions over the blockchain. We create a decentralized economy by providing a meeting point for brands and publishers where they can directly negotiate their collaboration. You can check out the meeting point or subscribe to learn about new campaigns.',
};

export default site;
