/**
 ** Set up blockchain deployment here
 */

const BigchainDB = require("bigchaindb-driver");

const API_PATH = "https://test.ipdb.io/api/v1/";
const conn = new BigchainDB.Connection(API_PATH);
const bip39 = require("bip39");

let seed;

const createSeed = async () => {
  let str = await bip39.mnemonicToSeed("hello");
  seed = str.slice(0, 32);
};

createSeed();
console.log(seed);

// const alice = new BigchainDB.Ed25519Keypair(seed);
