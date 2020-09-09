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
  const snapshot = await firebase
    .firestore()
    .collection("products")
    .doc(id)

    .get();

  // Single Product {}
  return snapshot.data();
}
