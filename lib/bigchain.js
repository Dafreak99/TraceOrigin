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
const seed = bip39.mnemonicToSeedSync("222").slice(0, 32);

const haitran = new BigchainDB.Ed25519Keypair(seed);
// Ed25519Keypair {
//   publicKey: 'T7pkXVadrnh52Z7Tejeaispr3jNF5zzMsvQuYkK9N84',
//   privateKey: 'GJ7Pu6o1gyzTV2CjTj4v4QAeyGd6vdPqSbF25ep4b9gH'
// }

export const deployToBlockchain = (product) => {
  const txCreateProduct = BigchainDB.Transaction.makeCreateTransaction(
    null,
    JSON.stringify(product),
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
  conn
    .postTransactionCommit(txSigned)
    .then((res) => {
      console.log(txSigned.id);
      // txSigned.id corresponds to the asset id of the painting
    })
    .catch((err) => console.log(err));
};
