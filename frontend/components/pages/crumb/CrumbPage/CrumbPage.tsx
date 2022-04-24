import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { CrumbLayout } from 'components/layout';
import { NextPageWithLayout } from 'pages/_app';
import { crumbsApiService, FingerPrintUtilService, linkApiService } from 'services';
import { LinkType } from 'types';
import { getSingleQueryParam } from 'utils/arrays';
import { redirectUrlFromLongPath } from 'utils/url';

import styles from './CrumbPage.module.scss';

const CrumbPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { domain, account } = router.query;
  const [link, setLink] = useState<LinkType | undefined>();

  const getSessionId = useCallback(async () => {
    const _sessionId = await FingerPrintUtilService.createFingerPrint();
    if (!_sessionId) { throw Error('It was not possible to create a fingerprint'); }

    return _sessionId;
  }, []);

  const getLink = useCallback(async () => {
    const _account: string | undefined = getSingleQueryParam(account);
    const _domain: string | undefined = getSingleQueryParam(domain);
    if (!_account) { throw Error('No "account" found in query parameters'); }
    if (!_domain) { throw Error('No "domain" found in query parameters'); }

    const _link = await linkApiService.getLink(_account, _domain);
    if (!_link) { throw Error(`No link found for account "${account}" and domain ${domain}`); }

    setLink(_link);
    return _link;
  }, [account, domain]);

  const buildCrumb = useCallback(async () => {
    try {
      const _sessionId = await getSessionId();
      const _link = await getLink();

      const transactionStarted = await crumbsApiService.createCrumb(_sessionId, _link.domain, _link.account);
      console.warn('Crumb transaction started', transactionStarted);
    } catch (error) {
      console.error(error);
      console.warn('Crumb transaction started', false);
    }
  }, [getSessionId, getLink]);

  useEffect(() => {
    if (domain && account) buildCrumb();
  }, [domain, account, buildCrumb]);

  useEffect(() => {
    if (link?.url) router.replace(redirectUrlFromLongPath(link, router.asPath));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link]);

  return (
    <div className={ styles.CrumbPage } />
  );
};

CrumbPage.Layout = CrumbLayout;

export default CrumbPage;
