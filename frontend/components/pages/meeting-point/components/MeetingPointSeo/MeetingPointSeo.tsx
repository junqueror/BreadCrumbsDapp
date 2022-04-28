import { FC } from 'react';
import { BreadcrumbJsonLd, NextSeo } from 'next-seo';

import { routes } from 'config/routing';
import site from 'config/site';

const PAGE_URL = `${site.BASE_URL}${routes.meetingPoint.path}`;
const PAGE_TITLE = 'The meeting point: Discover new sharing campaigns and join the #shareToEarn movement';
const PAGE_DESCRIPTION = 'Best place to connect brands and advertisers with affiliates, publishers and referrals. Compare campaigns, create your links and start sharing now';

type Props = {
};

const defaultProps = {
};

const MeetingPointSeo: FC<Props> = () => (
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
          name: routes.meetingPoint.label,
          item: PAGE_URL,
        },
      ] }
    />
  </>
);

MeetingPointSeo.defaultProps = defaultProps;

export default MeetingPointSeo;
