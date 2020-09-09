import firebase from "./firebase";

const firestore = firebase.firestore();

export const createUser = (user) => {
  return firestore.collection("users").doc(user.uid).set(user);
};
