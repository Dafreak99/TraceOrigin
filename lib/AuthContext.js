import { useState, useContext, createContext, useEffect } from "react";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useAuthProvider = () => {
  const [user, setUser] = useState(false);

  const signIn = async (values) => {};

  return {
    user,
    signIn,
  };
};
