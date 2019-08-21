const SupplyChain = artifacts.require("SupplyChain");

let accounts;
let supplyChain;

const emptyAddress = "0x00000000000000000000000000000000000000";

let sku = 1;
let upc = 1;
let ownerID = emptyAddress;
let originFarmerID = emptyAddress;
const originFarmName = "Rey Farms";
const originFarmInformation = "Lagos";
const originFarmLatitude = "6.451140";
const originFarmLongitude = "3.388400";
let productID = sku + upc;
const productNotes = "Best beans for Espresso";
const productPrice = web3.utils.toWei("1", "ether");
let itemState = 0;
let distributorID = emptyAddress;
let retailerID = emptyAddress;
let consumerID = emptyAddress;

contract("SupplyChain", function (acc) {
    accounts = acc;

    ownerID = accounts[0];
    originFarmerID = accounts[1];
    distributorID = accounts[2];
    retailerID = accounts[3];
    consumerID = accounts[4];

    console.log("Contract Owner: accounts[0] ", ownerID);
    console.log("Farmer: accounts[1] ", originFarmerID);
    console.log("Distributor: accounts[2] ", distributorID);
    console.log("Retailer: accounts[3] ", retailerID);
    console.log("Consumer: accounts[4] ", consumerID);
});

beforeEach(async () => {
    supplyChain = await SupplyChain.deployed();
});


it("Testing smart contract function harvestItem() that allows a farmer to harvest coffee", async () => {

    await supplyChain.addFarmer(originFarmerID);

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
    itemState = 0;

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
    assert.equal(resultBufferTwo[5], itemState, 'Error: Invalid item State');
    assert.equal(eventEmitted, true, 'Error: Harvested event not emitted');
});


it("Testing smart contract function processItem() that allows a farmer to process coffee", async () => {

    let eventEmitted = false;
    await supplyChain.Processed((err, res) => eventEmitted = true);

    await supplyChain.processItem(upc, { from: originFarmerID });
    itemState = 1;

    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    assert.equal(resultBufferTwo[5], itemState, 'Error: Invalid item State');
    assert.equal(eventEmitted, true, 'Error: Harvested event not emitted');
});


it("Testing smart contract function packItem() that allows a farmer to pack coffee", async () => {

    let eventEmitted = false;
    await supplyChain.Packed((err, res) => eventEmitted = true);

    await supplyChain.packItem(upc, { from: originFarmerID });
    itemState = 2;

    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    assert.equal(resultBufferTwo[5], itemState, 'Error: Invalid item State');
    assert.equal(eventEmitted, true, 'Error: Packed event not emitted');
});


it("Testing smart contract function sellItem() that allows a farmer to sell coffee", async () => {

    let eventEmitted = false;
    await supplyChain.ForSale((err, res) => eventEmitted = true);

    await supplyChain.sellItem(upc, productPrice, { from: originFarmerID });
    itemState = 3;

    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    assert.equal(resultBufferTwo[4], productPrice, 'Error: Invalid item productPrice');
    assert.equal(resultBufferTwo[5], itemState, 'Error: Invalid item State');
    assert.equal(eventEmitted, true, 'Error: ForSale event not emitted');
});


it("Testing smart contract function buyItem() that allows a distributor to buy coffee", async () => {

    await supplyChain.addDistributor(distributorID);

    let eventEmitted = false;
    await supplyChain.Sold((err, res) => eventEmitted = true);

    await supplyChain.buyItem(upc, { from: distributorID, value: productPrice });
    itemState = 4;

    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    assert.equal(resultBufferTwo[6], distributorID, 'Error: Invalid distributorID');
    assert.equal(resultBufferTwo[5], itemState, 'Error: Invalid item State');
    assert.equal(eventEmitted, true, 'Error: ForSale event not emitted');

});


it("Testing smart contract function shipItem() that allows a distributor to ship coffee", async () => {

    let eventEmitted = false;
    await supplyChain.Shipped((err, res) => eventEmitted = true);

    await supplyChain.shipItem(upc, { from: distributorID });
    itemState = 5;

    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    assert.equal(resultBufferTwo[5], itemState, 'Error: Invalid item State');
    assert.equal(eventEmitted, true, 'Error: Shipped event not emitted');
});


it("Testing smart contract function receiveItem() that allows a retailer to mark coffee received", async () => {

    await supplyChain.addRetailer(retailerID);

    let eventEmitted = false;
    await supplyChain.Received((err, res) => eventEmitted = true);

    await supplyChain.receiveItem(upc, { from: retailerID });
    itemState = 6;

    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    assert.equal(resultBufferTwo[7], retailerID, 'Error: Invalid distributorID');
    assert.equal(resultBufferTwo[5], itemState, 'Error: Invalid item State');
    assert.equal(eventEmitted, true, 'Error: Received event not emitted');
});


it("Testing smart contract function purchaseItem() that allows a consumer to purchase coffee", async () => {

    await supplyChain.addConsumer(consumerID);

    let eventEmitted = false;
    await supplyChain.Purchased((err, res) => eventEmitted = true);

    await supplyChain.purchaseItem(upc, { from: consumerID });
    itemState = 7;

    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    assert.equal(resultBufferTwo[8], consumerID, 'Error: Invalid consumerID');
    assert.equal(resultBufferTwo[5], itemState, 'Error: Invalid item State');
    assert.equal(eventEmitted, true, 'Error: Purchased event not emitted');
});


it("Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain", async () => {
    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);

    assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
    assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
    assert.equal(resultBufferOne[2], ownerID, 'Error: Missing or Invalid ownerID');
    assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID');
    assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName');
    assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
    assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
    assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');
});

it("Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain", async () => {
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    assert.equal(resultBufferTwo[0], sku, 'Error: Invalid item SKU');
    assert.equal(resultBufferTwo[1], upc, 'Error: Invalid item UPC');
    assert.equal(resultBufferTwo[2], productID, 'Error: Invalid item productID');
    assert.equal(resultBufferTwo[3], productNotes, 'Error: Invalid item productNotes');
    assert.equal(resultBufferTwo[4], productPrice, 'Error: Invalid item productPrice');
    assert.equal(resultBufferTwo[5], itemState, 'Error: Invalid item State');
    assert.equal(resultBufferTwo[6], distributorID, 'Error: Invalid item distributorID');
    assert.equal(resultBufferTwo[7], retailerID, 'Error: Invalid item retailerID');
    assert.equal(resultBufferTwo[8], consumerID, 'Error: Invalid item consumerID');
});
