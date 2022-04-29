import type { DefaultSeoProps } from 'next-seo';

import site from 'config/site';

const IMAGE_URL = `${site.BASE_URL}/static/images/home/page-background-thumbnail.png`;

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
        width: 600,
        height: 400,
        alt: 'Bread crumbs path',
        secureUrl: IMAGE_URL,
        type: 'image/png',
      },
    ],
  },
};

export default defaultSeoConfig;
