import type { DefaultSeoProps } from 'next-seo';

import site from 'config/site';

const defaultSeoConfig: DefaultSeoProps = {
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: site.BASE_URL,
    site_name: site.NAME,
    title: site.TITLE,
    description: site.DESCRIPTION,
    images: [
      {
        url: `${site.BASE_URL}/static/images/home/page-background.jpg`,
        width: 800,
        height: 600,
        alt: 'Bread crumbs path',
      },
    ],
  },
};

export default defaultSeoConfig;
