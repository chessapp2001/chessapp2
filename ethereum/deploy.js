const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledChessApp = require('./build/chesapp.json');

const provider = new HDWalletProvider(
  'elegant crazy license autumn congress this special able property armor potato welcome',
  'https://eth-sepolia.g.alchemy.com/v2/0wHI1_Oh8h3iUdsbhEUHvQbHHilB8uvV'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(compiledChessApp.abi)
        .deploy({ data: compiledChessApp.evm.bytecode.object })
        .send({ gas: 20000000, from: accounts[0] })
        .catch(err => console.log(err));

    console.log('ABI of contract:\n', JSON.stringify(compiledChessApp.abi));
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
    
};
deploy();
