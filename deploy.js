require('dotenv').config();

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { abi, evm } = require('./compile');
////start...web3 instance
provider = new HDWalletProvider(
  process.env.private_key,//private key or seed  phrase
  process.env.moralis_url//moralis url
);

const web3 = new Web3(provider);
////END
const deploy = async () => {////we only create a function to use async await,,,no need for the function
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);///shows contract address
  provider.engine.stop();
};
deploy();//.............................................calls the function
