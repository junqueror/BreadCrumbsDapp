import { InjectedConnector } from '@web3-react/injected-connector';
import Web3 from 'web3';

const GANACHE_PROTOCOL = process.env.NODE_ENV === 'production' ? 'http' : 'http';

const GANACHE_HOST = process.env.NEXT_PUBLIC_GANACHE_HOST || 'localhost';
const GANACHE_PORT = process.env.NEXT_PUBLIC_GANACHE_PORT || 8545;
const GANACHE_CHAIN_ID = process.env.NEXT_PUBLIC_GANACHE_CHAIN_ID || 1337;
const GANACHE_DEPLOYER_PRIVATE_KEY = process.env.NEXT_PUBLIC_GANACHE_DEPLOYER_PRIVATE_KEY || '';
const GANACHE_PROVIDER = new Web3.providers.HttpProvider(`${GANACHE_PROTOCOL}://${GANACHE_HOST}:${GANACHE_PORT}`);

const BINANCE_TESTNET_CHAIN_ID = 97;

const BINANCE_SMART_CHAIN_MAINNET_CHAIN_ID = 56;

const WEB3 = {
  DEFAULT_PROVIDER: GANACHE_PROVIDER,
  DEFAULT_CHAIN_ID: GANACHE_CHAIN_ID,
  DEPLOYER_PRIVATE_KEY: GANACHE_DEPLOYER_PRIVATE_KEY, // Same as fist private key in deploy/docker/images/ganache/ganache.sh
  SUPPORTED_CHAIN_IDS: [
    GANACHE_CHAIN_ID,
    BINANCE_TESTNET_CHAIN_ID,
    BINANCE_SMART_CHAIN_MAINNET_CHAIN_ID,
  ],
  SUPPORTED_CHAIN_NAMES: {
    [GANACHE_CHAIN_ID]: 'Ganache Local',
    [BINANCE_TESTNET_CHAIN_ID]: 'Binance Testnet',
    [BINANCE_SMART_CHAIN_MAINNET_CHAIN_ID]: 'BSC Mainnet',
  },
  BREADCRUMBS_TOKEN_NAME: 'BREAD',
};

const injectedConector = new InjectedConnector({
  supportedChainIds: WEB3.SUPPORTED_CHAIN_IDS.map(Number),
});

const getWeb3Library = (provider: any, _connector: any) => new Web3(provider); // this will vary according to whether you use e.g. ethers or web3.js

export default WEB3;

export {
  injectedConector,
  getWeb3Library,
};
