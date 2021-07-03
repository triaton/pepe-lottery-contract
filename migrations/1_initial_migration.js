const LotteryNFT = artifacts.require('LotteryNFT');
const Lottery = artifacts.require('Lottery');

module.exports = function(deployer) {
  // deployer.deploy(LotteryNFT).then(() => {
  //   console.log('LotteryNFT is deployed.');
  // });
  deployer.deploy(Lottery).then(() => {
    console.log('Lottery is deployed.');
  });
};
