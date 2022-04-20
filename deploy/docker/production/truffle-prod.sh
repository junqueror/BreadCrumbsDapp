#!/usr/bin/env bash

# echo "Compiling contracts...";
# sh -c "yarn truffle:compile";

# echo "Migrating contracts to Binance Smart Chain Mainnet...";
# sh -c "yarn truffle:migrate:bsc"

echo "Migrating contracts to Binance Testnet...";
sh -c "yarn truffle:migrate:testnet";
