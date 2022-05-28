require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/gdpUnmrRHNHEhluyD0vcdMD2os4_DyQy',
      accounts: [
        '9a83b03a819cf6eb108d1673af89de2c73991e06d6d52a2da86bd670ed236fff',
      ]
    }
  }
};
