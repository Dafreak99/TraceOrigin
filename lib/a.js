const BigchainDB = require("bigchaindb-driver");

const API_PATH = "https://test.ipdb.io/api/v1/";

const conn = new BigchainDB.Connection(API_PATH);

const bip39 = require("bip39");

const seed = bip39.mnemonicToSeedSync("thanhtri").slice(0, 32);

const haitran = new BigchainDB.Ed25519Keypair(seed);

console.log(haitran);

function createPaint() {
  // Construct a transaction payload
  const txCreatePaint = BigchainDB.Transaction.makeCreateTransaction(
    // Asset field
    obj,
    // Metadata field, contains information about the transaction itself
    // (can be `null` if not needed)
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
  // The owner of the painting signs the transaction
  const txSigned = BigchainDB.Transaction.signTransaction(
    txCreatePaint,
    haitran.privateKey
  );

  // Send the transaction off to BigchainDB
  conn.postTransactionCommit(txSigned).then((res) => {
    console.log(txSigned.id);
    // txSigned.id corresponds to the asset id of the painting
  });
}

// createPaint();
