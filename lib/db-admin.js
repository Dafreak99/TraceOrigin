import firebase from "./firebase";

export async function getAllProducts() {
  const snapshot = await firebase.firestore().collection("products").get();

  let products = [];

  snapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });

  return products;
}

export async function getProductsById(id) {
  const notes = await getNotesById(id);

  const snapshot = await firebase
    .firestore()
    .collection("products")
    .doc(id)

    .get();

  return {
    product: snapshot.data(),
    notes,
  };
}

export async function getNotesById(id) {
  let notes = [];

  const snaps = await firebase
    .firestore()
    .collection("notes")
    .where("productId", "==", id)
    .get();

  snaps.forEach((snap) => notes.push(snap.data()));
  return notes;
}
