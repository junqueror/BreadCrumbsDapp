import type { DefaultSeoProps } from 'next-seo';

import site from 'config/site';

const IMAGE_URL = `${site.BASE_URL}/static/images/home/page-background-thumbnail.jpg`;

const defaultSeoConfig: DefaultSeoProps = {
  title: site.TITLE,
  description: site.DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: site.BASE_URL,
    site_name: site.NAME,
    title: site.TITLE,
    description: site.DESCRIPTION,
    images: [
      {
        url: IMAGE_URL,
        width: 800,
        height: 600,
        alt: 'Bread crumbs path',
        secureUrl: IMAGE_URL,
        type: 'image/jpg',
      },
    ],
  },
};

export default defaultSeoConfig;
