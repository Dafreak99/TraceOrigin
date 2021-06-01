const BigchainDB = require("bigchaindb-driver");

const API_PATH = "https://test.ipdb.io/api/v1/";

const conn = new BigchainDB.Connection(API_PATH);

const bip39 = require("bip39");

/**
 ** Replace with SECRET_KEY as phrase when everything is working properly
 ** process.env.SECRET_KEY;
 */
const seed = bip39.mnemonicToSeedSync("chauhai").slice(0, 32);

const haitran = new BigchainDB.Ed25519Keypair(seed);

// publicKey: "2xYEg5H4Ub65P8gaw7bqRUqY9oc7hK8mp4tCacudLiFS"
// privateKey: "DUqWcqcHBmYp5EJA5ezQcRBBnMFmEx47hsFh6oE4jiZA"

/**
 ** CREATE TRANSACTION
 * @param {*} product
 * @returns trans.id
 */

export const deployToBlockchain = async (product) => {
  const txCreateProduct = BigchainDB.Transaction.makeCreateTransaction(
    product,
    {
      datetime: new Date().toString(),
      type: "FARMER",
    },
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

  return trans.id;
};

/**
 ** UPDATE TRANSACTION
 * @param {*} txCreatedID
 * @param {*} metadata
 * @returns postedTransaction
 */

export const updateAsset = async (txCreatedID, metadata) => {
  const txCreated = await conn.getTransaction(txCreatedID);

  const createTranfer = BigchainDB.Transaction.makeTransferTransaction(
    [
      {
        tx: txCreated,
        output_index: 0,
      },
    ],
    [
      BigchainDB.Transaction.makeOutput(
        BigchainDB.Transaction.makeEd25519Condition(haitran.publicKey)
      ),
    ],
    metadata
  );

  const signedTransfer = BigchainDB.Transaction.signTransaction(
    createTranfer,
    haitran.privateKey
  );

  const postedTransaction = await conn.postTransactionCommit(signedTransfer);
  return postedTransaction;
};

/**
 ** GET ALL TRANSACTIONS BY PUBLIC KEY
 * @returns transactions
 */

export const listOutputs = async () => {
  let outputs = await conn.listOutputs(haitran.publicKey);

  let transactions = [];
  for (let output of outputs) {
    const { asset } = await conn.getTransaction(output.transaction_id);

    // Only need _id, images and name
    if (asset.data) {
      transactions.push({
        _id: asset.data._id,
        images: asset.data.images,
        name: asset.data.name,
      });
    }
  }
  return transactions;
};

export const transactionsForAsset = async (assetId) => {
  let transactions = await conn.listTransactions(assetId);
  return transactions.slice(1);
};

export const getTransaction = async (transactionId) => {
  let transactions = await conn.getTransaction(transactionId);
  return transactions;
};

export const searchAsset = async (key) => {
  let transactions = await conn.searchAssets(key);
  return transactions[0];
};
