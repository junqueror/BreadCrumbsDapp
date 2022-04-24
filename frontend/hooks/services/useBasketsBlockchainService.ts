import { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

import useAccountContext from 'contexts/account/accountContext';
import BasketsBlockchainService, { basketsBlockchainService as defaultBasketsBlockchainService } from 'services/blockchain/BasketsBloackchainService';

const useBasketsBlockchainService = (): BasketsBlockchainService => {
  const { chainId, library } = useWeb3React();
  const { account } = useAccountContext();

  const [basketsBlockchainService, setBasketService] = useState<BasketsBlockchainService>(defaultBasketsBlockchainService);

  const loadBasketsBlockchainService = useCallback(async () => {
    if (account?.address) setBasketService(new BasketsBlockchainService(library, chainId, account));
    else setBasketService(basketsBlockchainService);
  }, [library, chainId, account]);

  useEffect(() => {
    loadBasketsBlockchainService();
  }, [loadBasketsBlockchainService, chainId, account]);

  return basketsBlockchainService;
};

export default useBasketsBlockchainService;
