const SupplyChain = artifacts.require('SupplyChain');

let accounts;
let supplyChain;

const emptyAddress = '0x00000000000000000000000000000000000000';

var sku = 1;
var upc = 1;
let ownerID = emptyAddress;
let originFarmerID = emptyAddress;
const originFarmName = "John Doe";
const originFarmInformation = "Yarray Valley";
const originFarmLatitude = "-38.239770";
const originFarmLongitude = "144.341490";
let productID = sku + upc;
const productNotes = "Best beans for Espresso";
const productPrice = "100";
let itemState = 0;
let distributorID = emptyAddress;
let retailerID = emptyAddress;
let consumerID = emptyAddress;

contract('SupplyChain', function (acc) {
    accounts = acc;

    ownerID = accounts[0];
    originFarmerID = accounts[1];
    distributorID = accounts[2];
    retailerID = accounts[3];
    consumerID = accounts[4];
});

beforeEach(async () => {
    supplyChain = await SupplyChain.deployed();

    await supplyChain.addFarmer(originFarmerID);
    await supplyChain.addDistributor(distributorID);
    await supplyChain.addRetailer(retailerID);
    await supplyChain.addConsumer(consumerID);

    console.log("Contract Owner: accounts[0] ", ownerID);
    console.log("Farmer: accounts[1] ", originFarmerID);
    console.log("Distributor: accounts[2] ", distributorID);
    console.log("Retailer: accounts[3] ", retailerID);
    console.log("Consumer: accounts[4] ", consumerID);
});


it("Testing smart contract function harvestItem() that allows a farmer to harvest coffee", async () => {

    let eventEmitted = false;
    await supplyChain.Harvested((err, res) => eventEmitted = true);

    await supplyChain.harvestItem(
        upc,
        originFarmerID,
        originFarmName,
        originFarmInformation,
        originFarmLatitude,
        originFarmLongitude,
        productNotes,
        { from: originFarmerID }
    );

    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
    assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
    assert.equal(resultBufferOne[2], ownerID, 'Error: Missing or Invalid ownerID');
    assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID');
    assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName');
    assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
    assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
    assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');
    assert.equal(resultBufferTwo[5], 0, 'Error: Invalid item State');
    assert.equal(eventEmitted, true, 'Error: Harvested event not emitted');
});

//
//
// // @todo
// // 2nd Test
// it("Testing smart contract function processItem() that allows a farmer to process coffee", async () => {
//
//     // Declare and Initialize a variable for event
//
//
//     // Watch the emitted event Processed()
//
//
//     // Mark an item as Processed by calling function processtItem()
//
//
//     // Retrieve the just now saved item from blockchain by calling function fetchItem()
//
//
//     // Verify the result set
//
// });
//
// // @todo
// // 3rd Test
// it("Testing smart contract function packItem() that allows a farmer to pack coffee", async () => {
//
//     // Declare and Initialize a variable for event
//
//
//     // Watch the emitted event Packed()
//
//
//     // Mark an item as Packed by calling function packItem()
//
//
//     // Retrieve the just now saved item from blockchain by calling function fetchItem()
//
//
//     // Verify the result set
//
// });
//
// // @todo
// // 4th Test
// it("Testing smart contract function sellItem() that allows a farmer to sell coffee", async () => {
//
//     // Declare and Initialize a variable for event
//
//
//     // Watch the emitted event ForSale()
//
//
//     // Mark an item as ForSale by calling function sellItem()
//
//
//     // Retrieve the just now saved item from blockchain by calling function fetchItem()
//
//
//     // Verify the result set
//
// });
//
// // @todo
// // 5th Test
// it("Testing smart contract function buyItem() that allows a distributor to buy coffee", async () => {
//
//     // Declare and Initialize a variable for event
//
//
//     // Watch the emitted event Sold()
//     var event = supplyChain.Sold()
//
//
//     // Mark an item as Sold by calling function buyItem()
//
//
//     // Retrieve the just now saved item from blockchain by calling function fetchItem()
//
//
//     // Verify the result set
//
// });
//
// // @todo
// // 6th Test
// it("Testing smart contract function shipItem() that allows a distributor to ship coffee", async () => {
//
//     // Declare and Initialize a variable for event
//
//
//     // Watch the emitted event Shipped()
//
//
//     // Mark an item as Sold by calling function buyItem()
//
//
//     // Retrieve the just now saved item from blockchain by calling function fetchItem()
//
//
//     // Verify the result set
//
// });
//
// // @todo
// // 7th Test
// it("Testing smart contract function receiveItem() that allows a retailer to mark coffee received", async () => {
//
//     // Declare and Initialize a variable for event
//
//
//     // Watch the emitted event Received()
//
//
//     // Mark an item as Sold by calling function buyItem()
//
//
//     // Retrieve the just now saved item from blockchain by calling function fetchItem()
//
//
//     // Verify the result set
//
// });
//
// // @todo
// // 8th Test
// it("Testing smart contract function purchaseItem() that allows a consumer to purchase coffee", async () => {
//
//     // Declare and Initialize a variable for event
//
//
//     // Watch the emitted event Purchased()
//
//
//     // Mark an item as Sold by calling function buyItem()
//
//
//     // Retrieve the just now saved item from blockchain by calling function fetchItem()
//
//
//     // Verify the result set
//
// });
//
// // @todo
// // 9th Test
// it("Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain", async () => {
//
//     // Retrieve the just now saved item from blockchain by calling function fetchItem()
//
//
//     // Verify the result set:
//
// });
//
// // @todo
// // 10th Test
// it("Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain", async () => {
//
//     // Retrieve the just now saved item from blockchain by calling function fetchItem()
//
//
//     // Verify the result set:
//
// });
