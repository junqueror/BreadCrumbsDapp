import { FC } from 'react';
import { BreadcrumbJsonLd, NextSeo } from 'next-seo';

import { routes } from 'config/routing';
import site from 'config/site';

const PAGE_URL = `${site.BASE_URL}${routes.bakers.path}`;
const PAGE_TITLE = 'Bakers area: dashboard for brands and advertisers';
const PAGE_DESCRIPTION = 'Check your promotion progress and your marketing campaigns. Create new baskets to start promoting your products and spreading the word about your brand';

type Props = {
};

const defaultProps = {
};

const BakersSeo: FC<Props> = () => (
  <>
    <NextSeo
      canonical={ PAGE_URL }
      description={ PAGE_DESCRIPTION }
      openGraph={ {
        url: PAGE_URL,
        title: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        images: [
          {
            url: `${site.BASE_URL}/static/images/home/page-background.jpg`,
            width: 800,
            height: 600,
            alt: 'Bread crumbs path',
          }],
      } }
      title={ PAGE_TITLE }
    />
    <BreadcrumbJsonLd
      itemListElements={ [
        {
          position: 1,
          name: routes.bakers.label,
          item: PAGE_URL,
        },
      ] }
    />
  </>
);

BakersSeo.defaultProps = defaultProps;

export default BakersSeo;
