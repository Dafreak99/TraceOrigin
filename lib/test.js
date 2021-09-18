const BigchainDB = require("bigchaindb-driver");

const API_PATH = "https://test.ipdb.io/api/v1/";

const conn = new BigchainDB.Connection(API_PATH);

const bip39 = require("bip39");

const seed = bip39.mnemonicToSeedSync("traceorigin").slice(0, 32);

const haitran = new BigchainDB.Ed25519Keypair(seed);

console.log(haitran);

const a = BigchainDB.Transaction.makeOutput(
    BigchainDB.Transaction.makeEd25519Condition(haitran.publicKey)
);

console.log(a);