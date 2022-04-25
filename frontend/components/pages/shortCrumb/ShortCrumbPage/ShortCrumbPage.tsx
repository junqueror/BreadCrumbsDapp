import {
  useCallback, useEffect, useState,
} from 'react';
import { useRouter } from 'next/router';

import { CrumbLayout } from 'components/layout';
import { NextPageWithLayout } from 'pages/_app';
import { crumbsApiService, FingerPrintUtilService, linkApiService } from 'services';
import { LinkType } from 'types';
import { getSingleQueryParam } from 'utils/arrays';
import { redirectUrlFromShortPath } from 'utils/url';

import styles from './ShortCrumbPage.module.scss';

const ShortCrumbPage: NextPageWithLayout & { useLayout?: boolean } = () => {
  const router = useRouter();
  const { shortId } = router.query;
  const [link, setLink] = useState<LinkType | undefined>();

  const getSessionId = useCallback(async () => {
    const _sessionId = await FingerPrintUtilService.createFingerPrint();
    if (!_sessionId) { throw Error('It was not possible to create a fingerprint'); }

    return _sessionId;
  }, []);

  const getLink = useCallback(async () => {
    const _shortId: string | undefined = getSingleQueryParam(shortId);
    if (!_shortId) { throw Error('No "short ID" found in query parameters'); }

    const _link = await linkApiService.getLinkFromShortId(_shortId);
    if (!_link) { throw Error(`No link found for short ID "${_shortId}"`); }

    setLink(_link);
    return _link;
  }, [shortId]);

  const buildCrumb = useCallback(async () => {
    try {
      const _sessionId = await getSessionId();
      const _link = await getLink();

      const transactionStarted = await crumbsApiService.createCrumb(_sessionId, _link.domain, _link.account);
      console.warn('Crumb transaction started', transactionStarted);
    } catch (error) {
      console.warn('Crumb transation started', false);
    }
  }, [getSessionId, getLink]);

  useEffect(() => {
    if (shortId) buildCrumb();
  }, [shortId, buildCrumb]);

  useEffect(() => {
    if (link?.url) router.replace(redirectUrlFromShortPath(link, router.asPath));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link]);

  return (
    <div className={ styles.CrumbPage } />
  );
};

ShortCrumbPage.Layout = CrumbLayout;

export default ShortCrumbPage;
