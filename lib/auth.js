import { useState, useContext, createContext, useEffect } from "react";
import Cookie from "js-cookie";
import fetch from "isomorphic-unfetch";

import firebase from "./firebase";
import { createUser } from "./db";
const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useAuthProvider = () => {
  const [user, setUser] = useState(null);

  const signinWithEmail = ({ email, password }) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => handleUser(res.user));
  };

  const signinWithGoogle = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((res) => handleUser(res.user));
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = {
        provider: rawUser.providerData[0].providerId,
        email: rawUser.email,
        uid: rawUser.uid,
        avatar: rawUser.photoURL,
      };

      console.log(user);

      fetch("http://localhost:3000/api/user", {
        method: "POST",
        body: JSON.stringify(user),
      });

      // Set cookie
      Cookie.set("trace-origin", true);
      setUser(user);
    } else {
      Cookie.set("trace-origin", false);
      setUser(false);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithEmail,
    signinWithGoogle,
    signout,
  };
};
