import { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

import defaultCrumbsService, { CrumbsService } from '../../services/crumbsService';

const useCrumbsService = (): CrumbsService => {
  const { chainId, library } = useWeb3React();

  const [crumbsService, setCrumbService] = useState<CrumbsService>(defaultCrumbsService);

  const loadCrumbsService = useCallback(async () => {
    setCrumbService(new CrumbsService(library, chainId));
  }, [library, chainId]);

  useEffect(() => {
    loadCrumbsService();
  }, [loadCrumbsService, chainId]);

  return crumbsService;
};

export default useCrumbsService;
