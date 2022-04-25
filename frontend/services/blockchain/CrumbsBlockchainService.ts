import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

import web3config from 'config/web3';
import { CrumbType } from 'types';

import Bread from '../../../backend/abis/Bread.json';
import Crumbs from '../../../backend/abis/Crumbs.json';

class CrumbsBlockchainService {
    static web3Options = { transactionConfirmationBlocks: 1 };

    static UndefinedDeployerAccountError = new Error('Deployer account is not defined');

    web3: Web3;

    chainId: number;

    deployerAccount: {
      privateKey: string,
      address: string
    } | undefined;

    breadContract: Contract;

    crumbsContract: Contract;

    constructor(
      web3: Web3 = new Web3(web3config.DEFAULT_PROVIDER, undefined, CrumbsBlockchainService.web3Options),
      chainId: number = web3config.DEFAULT_CHAIN_ID,
      deployerPrivateKey: string = '',
    ) {
      this.web3 = web3;
      this.chainId = chainId;
      this.deployerAccount = deployerPrivateKey
        ? {
          privateKey: deployerPrivateKey,
          address: this.web3.eth.accounts.privateKeyToAccount(deployerPrivateKey).address,
        }
        : undefined;

      const breadNetworkData = Bread.networks[chainId];
      const crumbsNetworkData = Crumbs.networks[chainId];

      this.breadContract = new this.web3.eth.Contract(Bread.abi, breadNetworkData?.address);
      this.crumbsContract = new this.web3.eth.Contract(Crumbs.abi, crumbsNetworkData?.address);

      this.getCrumbs.bind(this);
      this.createCrumb.bind(this);
    }

    getCrumbs = (domain: string): Promise<CrumbType[]> => this.crumbsContract.methods.getCrumbs(domain).call()

    createCrumb = (
      sessionId: string,
      domain: string,
      account: string,
    ): Promise<boolean> => {
      if (!this.deployerAccount) throw (CrumbsBlockchainService.UndefinedDeployerAccountError);

      const createCrumbTx = this.crumbsContract.methods.createCrumb(sessionId, domain, account);

      return new Promise<boolean>((resolve, reject) => createCrumbTx.estimateGas({ from: this.deployerAccount?.address })
        .then((gasEstimate: number) => {
          const options = {
            to: this.crumbsContract.address, // target contract address
            from: this.deployerAccount?.address,
            data: createCrumbTx.encodeABI(),
            gas: this.web3.utils.toHex(gasEstimate),
          };

          return this.web3.eth.accounts.signTransaction(options, this.deployerAccount.privateKey);
        }).then((signedTx: any) => this.web3.eth.sendSignedTransaction(signedTx.rawTransaction)
          .on('transactionHash', () => resolve(true))
          .on('error', reject))
        .catch(reject));
    };
}

const crumbsBlockchainService = new CrumbsBlockchainService();

export default CrumbsBlockchainService;

export {
  crumbsBlockchainService,
};
