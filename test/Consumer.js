const { expect } = require("chai");
const abi = require('../artifacts/contracts/Consumer.sol/EnetscoresConsumer.json').abi;

describe("Consumer contract", function () {
  let Consumer;
  let hardhatConsumer;
  let owner;
  let addr1;
  let addr2;
  let addr3;
  let inter;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("EnetscoresConsumer");
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    inter = new ethers.utils.Interface(abi);
    
  });

  it("Test", async function () {

    console.log(inter);
    expect(1);
  });
});