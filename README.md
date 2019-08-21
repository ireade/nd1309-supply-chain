# Fair Trade Coffee Supply Chain

Prove the authenticity of coffee using the Ethereum blockchain.

Todo:
- Data modelling diagram
- Host on IPFS
- Libraries

## Project Write-Up

### UML Diagrams

[Activity Diagram](./uml/Activity%20Diagram.jpeg)<br>
[Sequence Diagram](./uml/Sequence%20Diagram.jpeg)<br>
[State Diagram](./uml/State%20Diagram.jpeg)<br>
[Data Modelling]()<br>

### Libraries

**Truffle**: Used for developing, testing, and deploying my smart contracts

### IPFS

???


## Smart Contract

SupplyChain Tx hash: [0x7df1148cb8e1e463efffb2530d214153e9c5a41e1c4638c1aa96be99de7b969a](https://rinkeby.etherscan.io/tx/0x7df1148cb8e1e463efffb2530d214153e9c5a41e1c4638c1aa96be99de7b969a)<br>
SupplyChain Contract address: [0x7EDA0FdA90C8689B5E1d37DC8d94cD4F8344bAbB](https://rinkeby.etherscan.io/address/0x7eda0fda90c8689b5e1d37dc8d94cd4f8344babb)<br>

### Full Migrations Output

```
1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x793d089e91cf26ba5a5755d9ddf66bf641cd5f5128cb9e61e5712ad1595bcc64
   > Blocks: 1            Seconds: 17
   > contract address:    0x1e9067e5998B6ce80807a4D047A5d874e399171E
   > block number:        4949894
   > block timestamp:     1566378437
   > account:             0xb43eAdc52571fD08291FA783AEa561187d2C544D
   > balance:             18.7017016189999999
   > gas used:            261265
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00261265 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00261265 ETH


2_deploy_contracts.js
=====================

   Deploying 'FarmerRole'
   ----------------------
   > transaction hash:    0xee2f37fa88f5c48eb259ad53a3228dab6b1c34f2576580d5d84c5595d26b1bbd
   > Blocks: 1            Seconds: 25
   > contract address:    0x49f9eC69d4949d56704C8b4305c727A1310434f7
   > block number:        4949897
   > block timestamp:     1566378482
   > account:             0xb43eAdc52571fD08291FA783AEa561187d2C544D
   > balance:             18.6972078489999999
   > gas used:            407354
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00407354 ETH


   Deploying 'DistributorRole'
   ---------------------------
   > transaction hash:    0x582732feead3925bebd944c4e79f679bde57131b132cc30dc24ff4ebee2997d4
   > Blocks: 0            Seconds: 5
   > contract address:    0xCA6BB95AC56c4E3B35407c045a36e9Bd53e0934f
   > block number:        4949898
   > block timestamp:     1566378497
   > account:             0xb43eAdc52571fD08291FA783AEa561187d2C544D
   > balance:             18.6931215489999999
   > gas used:            408630
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.0040863 ETH


   Deploying 'RetailerRole'
   ------------------------
   > transaction hash:    0xbcdb8593a37e383c89f6c495aaf704e0c4dd846581ab5becf357c0a09915b4a1
   > Blocks: 0            Seconds: 9
   > contract address:    0xBd0b3E7dDAC211dCa34B6FDff7b7CDA51FeE8381
   > block number:        4949899
   > block timestamp:     1566378512
   > account:             0xb43eAdc52571fD08291FA783AEa561187d2C544D
   > balance:             18.6890426489999999
   > gas used:            407890
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.0040789 ETH


   Deploying 'ConsumerRole'
   ------------------------
   > transaction hash:    0x0c5e3351c39d3ff12d62ecf299e7c707049a95e79fd065474673f0dd431776df
   > Blocks: 1            Seconds: 9
   > contract address:    0xb5610b67EcaDC1C96bb913642745fe2c67C8554E
   > block number:        4949900
   > block timestamp:     1566378527
   > account:             0xb43eAdc52571fD08291FA783AEa561187d2C544D
   > balance:             18.6849637489999999
   > gas used:            407890
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.0040789 ETH


   Deploying 'SupplyChain'
   -----------------------
   > transaction hash:    0x7df1148cb8e1e463efffb2530d214153e9c5a41e1c4638c1aa96be99de7b969a
   > Blocks: 0            Seconds: 5
   > contract address:    0x7EDA0FdA90C8689B5E1d37DC8d94cD4F8344bAbB
   > block number:        4949901
   > block timestamp:     1566378542
   > account:             0xb43eAdc52571fD08291FA783AEa561187d2C544D
   > balance:             18.6510206889999999
   > gas used:            3394306
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.03394306 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0502607 ETH


Summary
=======
> Total deployments:   6
> Final cost:          0.05287335 ETH
```

## Development Notes

Truffle v5.0.31 (core: 5.0.31)<br>
Solidity v0.5.0 (solc-js)<br>
Node v10.16.0<br>
Web3.js v1.2.1<br>

