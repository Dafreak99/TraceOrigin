const BigchainDB = require("bigchaindb-driver");

const API_PATH = "https://test.ipdb.io/api/v1/";

const conn = new BigchainDB.Connection(API_PATH);

const bip39 = require("bip39");

/**
 ** Replace with SECRET_KEY as phrase when everything is working properly
 ** process.env.SECRET_KEY;
 */
const seed = bip39.mnemonicToSeedSync("traceorigin").slice(0, 32);

const owner = new BigchainDB.Ed25519Keypair(seed);

// Ed25519Keypair {
//     publicKey: '6ZoQX94qZoewQVLRCmZymJ71CMYFssbBwRxG6BTUQ9fY',
//     privateKey: 'HEL989kcJHJALDSmK1EEwmVXTmApSxFYCmKPXJcvuiT7'
//   }
  

/**
 ** CREATE TRANSACTION
 * @param {*} product
 * @returns trans.id
 */


// const asset = {
//      name: "Tôm càng xanh",
//      harvestedDate: '22/10/2020'
//  }

// const metadata = {
//     datetime: new Date().toString(),
//     type: "FARMER",
// };

// const output = [
//     BigchainDB.Transaction.makeOutput(
//         BigchainDB.Transaction.makeEd25519Condition(owner.publicKey)
//     )
// ];


const deployToBlockchain = async () => {
  const txCreateProduct = BigchainDB.Transaction.makeCreateTransaction(
    asset,
    metadata,
    // Output. For this case we create a simple Ed25519 condition
    output,
    // Issuers
    owner.publicKey
  );

  // The owner signs the transaction
  const txSigned = BigchainDB.Transaction.signTransaction(
    txCreateProduct,
    owner.privateKey
  );

  // Send the transaction off to BigchainDB

  const trans = await conn.postTransaction(txSigned);
  console.log(trans);
  return trans.id;
};

/**
 ** UPDATE TRANSACTION
 * @param {*} txCreatedID
 * @param {*} metadata
 * @returns postedTransaction
 */

// deployToBlockchain();

// {
//     asset: { data: { harvestedDate: '22/10/2020', name: 'Tôm càng xanh' } },
//     id: 'c7685c3bceb1a95ffc4926d4fd9b69dffb9f4e22a846f766aeac215a79983ba0',
//     inputs: [
//       {
//         fulfillment: 'pGSAIFKxfcxwlcMbSgM2_7uHT_kHcVI_e11T2pQQHNp_okZjgUB0L--ekUaSyQbbtsP-u6SZHx7LPRuGlvjmQBoIwLFAWvsGjeaX9akVzSk0Or9CN1YxxhvpdBDx1p_O0jbBI6wN',
//         fulfills: null,
//         owners_before: [Array]
//       }
//     ],
//     metadata: {
//       datetime: 'Sun Jun 13 2021 11:47:18 GMT+0700 (Indochina Time)',
//       type: 'FARMER'
//     },
//     operation: 'CREATE',
//     outputs: [ { amount: '1', condition: [Object], public_keys: [Array] } ],
//     version: '2.0'
//   }

const metadata = {
  datetime: new Date().toString(),
  type: "CONSUMPTION",
  name: "Siêu thị coop.mart",
  address: '01 Hoà Bình, Phường Tân An, Quận Ninh Kiều, Thành phố Cần Thơ'
};
const txCreatedID = "c7685c3bceb1a95ffc4926d4fd9b69dffb9f4e22a846f766aeac215a79983ba0";

const updateAsset = async (txCreatedID, metadata) => {
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
        BigchainDB.Transaction.makeEd25519Condition(owner.publicKey)
      ),
    ],
    metadata
  );

  const signedTransfer = BigchainDB.Transaction.signTransaction(
    createTranfer,
    owner.privateKey
  );

  const postedTransaction = await conn.postTransactionCommit(signedTransfer);
  console.log(postedTransaction);
  return postedTransaction;
};

// updateAsset(txCreatedID, metadata);

/**
 ** GET ALL TRANSACTIONS BY PUBLIC KEY
 * @returns transactions
 */

const listOutputs = async () => {
  let outputs = await conn.listOutputs(owner.publicKey);

  let transactions = [];
  for (let output of outputs) {
    const { asset } = await conn.getTransaction(output.transaction_id);

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

const transactionsForAsset = async (assetId) => {
  let transactions = await conn.listTransactions(assetId);
  return transactions.slice(1);
};

const allTransactionsForAsset = async (assetId) => {
  let transactions = await conn.listTransactions(assetId);
  console.log(transactions);
  return transactions;
};

const getTransaction = async (transactionId) => {
  let transactions = await conn.getTransaction(transactionId);
  return transactions;
};

const searchAsset = async (key) => {
  let transactions = await conn.searchAssets(key);
  return transactions[0];
};

allTransactionsForAsset("c7685c3bceb1a95ffc4926d4fd9b69dffb9f4e22a846f766aeac215a79983ba0");