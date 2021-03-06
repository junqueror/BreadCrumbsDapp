import { useEffect, useMemo } from 'react';
import useSWR, { SWRResponse } from 'swr';

import { contracts } from 'config/routing';
import useAccountContext from 'contexts/account/accountContext';
import useBasketsBlockchainService from 'hooks/services/useBasketsBlockchainService';
import * as basketSite from 'pages/api/baskets/[domain]';
import { BasketType } from 'types';
import { fromWei } from 'utils/web3';

const BASKET_REFRESH_INTERVAL = 60000; // 60s

const useBaskets = (suspense = false): SWRResponse & {
    baskets: BasketType[],
} => {
  const { account } = useAccountContext();
  const BasketsBlockchainService = useBasketsBlockchainService();

  const result: SWRResponse = useSWR(
    contracts.baskets.getAllBaskets,
    BasketsBlockchainService.getBaskets,
    {
      suspense,
      refreshInterval: BASKET_REFRESH_INTERVAL,
    },
  );

  let baskets: BasketType[] = useMemo(() => result.data || [], [result.data]);

  const domains = useMemo(() => baskets.map((basket: BasketType) => basket.domain), [baskets]);

  const fetchBasketSites = (_:string, _domains: string[] = []) => {
    if (_domains.length === 0) throw (Error('No domains to fetch sites'));
    return basketSite.getMany(_domains);
  };

  const sitesResult: SWRResponse = useSWR(
    [basketSite.manyPath, domains],
    fetchBasketSites,
  );

  const sites: basketSite.SiteType[] = sitesResult.data || [];

  if (baskets) {
    baskets = baskets.map((basket: any) => {
      const site = sites.find((data: basketSite.SiteType) => data?.domain === basket.domain);

      return ({
        ...basket,
        amount: fromWei(basket.amount),
        price: fromWei(basket.price),
        image: site?.image,
        title: site?.title || basket.domain,
        description: site?.description,
      });
    });
  }

  useEffect(() => {
    result.mutate(); // revalidate baskets
  }, [account]);

  return {
    ...result,
    baskets,
  };
};

export default useBaskets;
