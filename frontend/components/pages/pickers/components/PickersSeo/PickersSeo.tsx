import { FC } from 'react';
import { BreadcrumbJsonLd, NextSeo } from 'next-seo';

import { routes } from 'config/routing';
import site from 'config/site';

const PAGE_URL = `${site.BASE_URL}${routes.pickers.path}`;
const PAGE_TITLE = 'Pickers area: Dashboard for affilaites, referrals and publishers';
const PAGE_DESCRIPTION = 'Check your sharing progress: crumbs collected, link profits and payments status';

type Props = {
};

const defaultProps = {
};

const PickersSeo: FC<Props> = () => (
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
          name: routes.pickers.label,
          item: PAGE_URL,
        },
      ] }
    />
  </>
);

PickersSeo.defaultProps = defaultProps;

export default PickersSeo;
