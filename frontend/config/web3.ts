import { InjectedConnector } from '@web3-react/injected-connector';
import Web3 from 'web3';

const GANACHE_PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http';

const GANACHE_HOST = process.env.NEXT_PUBLIC_GANACHE_HOST || 'localhost';
const GANACHE_PORT = process.env.NEXT_PUBLIC_GANACHE_PORT || 8545;
const GANACHE_CHAIN_ID = process.env.NEXT_PUBLIC_GANACHE_CHAIN_ID || 1337;
const GANACHE_DEPLOYER_PRIVATE_KEY = process.env.NEXT_PUBLIC_GANACHE_DEPLOYER_PRIVATE_KEY;

const WEB3 = {
  DEFAULT_PROVIDER: new Web3.providers.HttpProvider(`${GANACHE_PROTOCOL}://${GANACHE_HOST}:${GANACHE_PORT}`),
  DEFAULT_SERVER_PROVIDER: new Web3.providers.HttpProvider(`${GANACHE_PROTOCOL}://${GANACHE_HOST}:${GANACHE_PORT}`),
  DEFAULT_CHAIN_ID: GANACHE_CHAIN_ID,
  DEPLOYER_PRIVATE_KEY: GANACHE_DEPLOYER_PRIVATE_KEY, // Same as fist private key in deploy/docker/images/ganache/ganache.sh
  SUPPORTED_CHAIN_IDS: {
    ETHEREUM: 1,
    GANACHE_LOCAL: GANACHE_CHAIN_ID,
  },
  SUPPORTED_CHAIN_NAMES: {
    1: 'Ethereum',
    [GANACHE_CHAIN_ID]: 'Ganache Local',
  },
};

const connector = new InjectedConnector({
  supportedChainIds: Object.values(WEB3.SUPPORTED_CHAIN_IDS).map(Number),
});

const getWeb3Library = (provider: any, _connector: any) => new Web3(provider); // this will vary according to whether you use e.g. ethers or web3.js

export default WEB3;

export {
  connector,
  getWeb3Library,
};
