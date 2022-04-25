const PUBLIC_FRONTEND_HOST = process.env.NEXT_PUBLIC_FRONTEND_HOST;
const PUBLIC_FRONTEND_PORT = Number(process.env.NEXT_PUBLIC_FRONTEND_PORT);
const protocol = process.env.NEXT_PUBLIC_ENV === 'local' ? 'http' : 'https';

const site = {
  NAME: 'Bread Crumbs',
  DOMAIN: 'bread-crumbs.tech',
  BASE_URL: PUBLIC_FRONTEND_PORT
    ? `${protocol}://${PUBLIC_FRONTEND_HOST}:${PUBLIC_FRONTEND_PORT}`
    : `${protocol}://${PUBLIC_FRONTEND_HOST}`,
};

export default site;
