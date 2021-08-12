const Web3 = require('web3');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

const ETHUnit = 1000000000000000000;

function readContent(path) {
  return JSON.parse(fs.readFileSync(path).toString());
}
/* web3 instance */
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER));

const pvKey = process.env.PV_KEY;
const myAccount = web3.eth.accounts.privateKeyToAccount(pvKey).address;

// Abis
const LotteryAbi = readContent('build/contracts/Lottery.json').abi;

// Contract addresses
const LotteryAddress = '0x6F22feAD2e710e1634691B6D87aa3bCB935e5Da5';

// Contracts
const LotteryContract = new web3.eth.Contract(LotteryAbi, LotteryAddress);


const PEPEAddress = '0x699Ee768A8A2850eFdA67f5e89b12a7e20Fd631A';
const LotteryNftAddress = '0x1baC7989A45779FdA8dF86dBF8cF8d02bdF5c9d2';

async function initializeLottery() {
  let data = LotteryContract.methods.initialize(PEPEAddress, LotteryNftAddress, ETHUnit.toString(), 9, myAccount, myAccount);
  let encodedABI = data.encodeABI();
  let signedTx = await web3.eth.accounts.signTransaction(
    {
      from: myAccount,
      to: LotteryAddress,
      data: encodedABI,
      gas: 1000000,
      value: 0
    },
    pvKey
  );
  try {
    const success = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(success);
  } catch (e) {
    console.log(e);
  }
}

async function enterDrawingPhase() {
  // console.log(await LotteryContract.methods.drawed().call());
  let data = LotteryContract.methods.enterDrawingPhase();
  let encodedABI = data.encodeABI();
  let signedTx = await web3.eth.accounts.signTransaction(
    {
      from: myAccount,
      to: LotteryAddress,
      data: encodedABI,
      gas: 1000000,
      value: 0
    },
    pvKey
  );
  try {
    const success = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(success);
  } catch (e) {
    console.log(e);
  }
}

async function drawing(amount) {
  let data = LotteryContract.methods.drawing(amount);
  let encodedABI = data.encodeABI();
  let signedTx = await web3.eth.accounts.signTransaction(
    {
      from: myAccount,
      to: LotteryAddress,
      data: encodedABI,
      gas: 1000000,
      value: 0
    },
    pvKey
  );
  try {
    const success = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(success);
  } catch (e) {
    console.log(e);
  }
}

async function resetLottery() {
  // console.log(await LotteryContract.methods.drawed().call());
  let data = LotteryContract.methods.reset();
  let encodedABI = data.encodeABI();
  let signedTx = await web3.eth.accounts.signTransaction(
    {
      from: myAccount,
      to: LotteryAddress,
      data: encodedABI,
      gas: 1000000,
      value: 0
    },
    pvKey
  );
  try {
    const success = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(success);
  } catch (e) {
    console.log(e);
  }
}

// initializeLottery();
resetLottery().then();
// enterDrawingPhase().then();
// drawing(30).then();
