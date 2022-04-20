require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const { GANACHE_HOST, GANACHE_PORT, MNEMONIC } = process.env;

module.exports = {
  networks: {
    development: {
      host: GANACHE_HOST,
      port: GANACHE_PORT,
      network_id: '*', // Match any network id
      // gasPrice: 100000000000,
      // gas: 6721975, // gas limit,
    },
    testnet: {
      provider: () => new HDWalletProvider(MNEMONIC, 'https://data-seed-prebsc-1-s1.binance.org:8545'),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    bsc: {
      provider: () => new HDWalletProvider(MNEMONIC, 'https://bsc-dataseed1.binance.org'),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  contracts_directory: './contracts/',
  contracts_build_directory: './abis/',
  migrations_directory: './migrations/',
  test_directory: './tests',
  compilers: {
    solc: {
      version: '0.8.10',
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  mocha: {
    useColors: true,
  },
};
