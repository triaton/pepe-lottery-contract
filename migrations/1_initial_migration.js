const LotteryNFT = artifacts.require('LotteryNFT');
const Lottery = artifacts.require('Lottery');

module.exports = async function(deployer) {
  await deployer.deploy(LotteryNFT);
  await deployer.deploy(Lottery);
};
