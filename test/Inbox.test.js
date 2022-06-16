const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { abi, evm } = require('../compile');

let accounts;
let inbox;//variable stores the contract 

beforeEach(async () => {
  
  //NB Every function is asynchronous 
  accounts = await web3.eth.getAccounts()// {for accounts}Get a list of all accounts--via web3.eth.getAccounts().then(fetched => {console.log(fetched);});
  inbox = await new web3.eth.Contract(abi)//{for contract}use one of those accounts to deploy the contract--via .send({ from: accounts[0], gas: '1000000' });
    .deploy({
      data: evm.bytecode.object,
      arguments: ['Hi there!'],///for the purpose of constructor
    })
    .send({ from: accounts[0], gas: '1000000' });//{.send}method is what deploys the contract,not {.deploy}method
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);////address.ok checks if {inbox.options.address--which is the address} is defined ie.truthy value or not 
    console.log(inbox);///show contract--via console.log(inbox);
                       ////show list of all accounts--via console.log(accounts);
  });
  it('has a default message', async () => {
    const message = await inbox.methods.message().call(); ///
    assert.equal(message, 'Hi there!');
  });
  it('can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] });//account 0 is what modifies
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });
});
