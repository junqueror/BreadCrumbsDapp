import { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

import useAccountContext from 'contexts/account/accountContext';

import defaultBasketsService, { BasketsService } from '../../services/basketsService';

const useBasketsService = (): BasketsService => {
  const { chainId, library } = useWeb3React();
  const { account } = useAccountContext();

  const [basketsService, setBasketService] = useState<BasketsService>(defaultBasketsService);

  const loadBasketsService = useCallback(async () => {
    if (account?.address) setBasketService(new BasketsService(library, chainId, account));
    else setBasketService(defaultBasketsService);
  }, [library, chainId, account]);

  useEffect(() => {
    loadBasketsService();
  }, [loadBasketsService, chainId, account]);

  return basketsService;
};

export default useBasketsService;
