import { useState, useEffect, useContext, createContext } from "react";
import useSWR from "swr";
import fetcher from "../utils/fetcher";

const FarmContext = createContext();

const FarmProvider = ({ children }) => {
  const { data, error } = useSWR("/api/farm", fetcher);

  return <FarmContext.Provider value={value}>{children}</FarmContext.Provider>;
};
