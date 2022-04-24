import { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

import CrumbsBlockchainService, { crumbsBlockchainService as defaultCrumbsBlockchainService } from 'services/blockchain/CrumbsBlockchainService';

const useCrumbsBlockchainService = (): CrumbsBlockchainService => {
  const { chainId, library } = useWeb3React();

  const [crumbsBlockchainService, setCrumbService] = useState<CrumbsBlockchainService>(defaultCrumbsBlockchainService);

  const loadCrumbsBlockchainService = useCallback(async () => {
    setCrumbService(new CrumbsBlockchainService(library, chainId));
  }, [library, chainId]);

  useEffect(() => {
    loadCrumbsBlockchainService();
  }, [loadCrumbsBlockchainService, chainId]);

  return crumbsBlockchainService;
};

export default useCrumbsBlockchainService;
