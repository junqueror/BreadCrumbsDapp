import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import web3config from 'config/web3';
import BasketType from 'types/BasketType';

import Baskets from '../../../backend/abis/Baskets.json';
import Bread from '../../../backend/abis/Bread.json';

class BasketsBlockchainService {
    static web3Options = { transactionConfirmationBlocks: 1 };

    static UndefinedAccountError = new Error('Account is not defined');

    web3: Web3;

    chainId: number;

    breadContract: Contract;

    basketsContract: Contract;

    account: {
        address: string
    };

    constructor(
      web3: Web3 = new Web3(web3config.DEFAULT_PROVIDER, undefined, BasketsBlockchainService.web3Options),
      chainId: number = Number(web3config.DEFAULT_CHAIN_ID),
      account: { address: string } = { address: ' ' },
    ) {
      this.web3 = web3;
      this.chainId = chainId;

      const breadNetworkData = Bread.networks[String(chainId)];
      const basketsNetworkData = Baskets.networks[String(chainId)];

      this.breadContract = new this.web3.eth.Contract(Bread.abi as AbiItem[], breadNetworkData?.address);
      this.basketsContract = new this.web3.eth.Contract(Baskets.abi as AbiItem[], basketsNetworkData?.address);
      this.account = account;
    }

    getBaskets = (): Promise<BasketType[]> => this.basketsContract.methods.getAllBaskets().call();

    createBasket = (
      domain: string,
      amount: any,
      price: any,
    ) => {
      if (!this.account?.address) throw (BasketsBlockchainService.UndefinedAccountError);

      return new Promise<BasketType>((resolve, reject) => this.breadContract.methods.approve(this.basketsContract.address, amount)
        .send({ from: this.account.address })
        .on('transactionHash', () => this.basketsContract.methods
          .createBasket(domain, amount, price)
          .send({ from: this.account.address })
          .on('confirmation', resolve)
          .on('error', reject)
        )
        .on('error', reject));
    };

    getBasket = (domain: string): Promise<BasketType> => {
      if (!this.account?.address) throw (BasketsBlockchainService.UndefinedAccountError);

      return this.basketsContract.methods.getBasket(domain).call({ from: this.account.address });
    }

    updateBasket = (
      domain: string,
      amount: any,
      price: any,
    ) => new Promise<BasketType>((resolve, reject) => {
      if (!this.account?.address) throw (BasketsBlockchainService.UndefinedAccountError);

      return this.breadContract.methods.approve(this.basketsContract.address, amount)
        .send({ from: this.account.address })
        .on('confirmation', () => this.basketsContract.methods
          .updateBasket(domain, amount, price)
          .send({ from: this.account.address })
          .on('confirmation', resolve)
          .on('error', reject))
        .on('error', reject);
    });

    deleteBasket = (
      domain: string,
    ) => {
      if (!this.account?.address) throw (BasketsBlockchainService.UndefinedAccountError);

      return new Promise<boolean>((resolve, reject) => this.basketsContract.methods.deleteBasket(domain)
        .send({ from: this.account.address })
        .on('confirmation', resolve)
        .on('error', reject));
    };
}

export default BasketsBlockchainService;
const basketsBlockchainService = new BasketsBlockchainService();

export {
  basketsBlockchainService,
};
