/**
 ** Set up blockchain deployment here
 */

const BigchainDB = require("bigchaindb-driver");

const API_PATH = "https://test.ipdb.io/api/v1/";

const conn = new BigchainDB.Connection(API_PATH);

const bip39 = require("bip39");

/**
 ** Replace with SECRET_KEY as phrase when everything is working properly
 ** process.env.SECRET_KEY;
 */
const seed = bip39.mnemonicToSeedSync("tranchauhai").slice(0, 32);

const haitran = new BigchainDB.Ed25519Keypair(seed);
// publicKey: "2xYEg5H4Ub65P8gaw7bqRUqY9oc7hK8mp4tCacudLiFS"
// privateKey: "DUqWcqcHBmYp5EJA5ezQcRBBnMFmEx47hsFh6oE4jiZA"

export const deployToBlockchain = async (product) => {
  console.log(haitran);

  const txCreateProduct = BigchainDB.Transaction.makeCreateTransaction(
    product,
    null,
    // Output. For this case we create a simple Ed25519 condition
    [
      BigchainDB.Transaction.makeOutput(
        BigchainDB.Transaction.makeEd25519Condition(haitran.publicKey)
      ),
    ],
    // Issuers
    haitran.publicKey
  );

  // The owner signs the transaction
  const txSigned = BigchainDB.Transaction.signTransaction(
    txCreateProduct,
    haitran.privateKey
  );

  // Send the transaction off to BigchainDB

  const trans = await conn.postTransaction(txSigned);

  console.log("trans", trans);
  return trans.id;
};
