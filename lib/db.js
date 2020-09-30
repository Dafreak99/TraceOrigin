import firebase from "./firebase";

const firestore = firebase.firestore();

export const createUser = async (data) => {
  // Replace this by storing the information to Mongodb
  // return firestore.collection("users").doc(user.uid).set(user);
  // try {
  //   let user = new User(data);
  //   await user.save();
  // } catch (error) {
  //   console.log(error);
  // }
};

export const createNote = (note) => {
  return firestore.collection("notes").add(note);
};
