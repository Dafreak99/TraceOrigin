import Farm from "../models/Farm";
import jwt from "jsonwebtoken";

import dbConnect from "./dbConnect";

dbConnect();

export const getYourFarm = async (token) => {
  // Something wrong with the secret key
  const decoded = jwt.verify(token, "lenient");

  let farm = await Farm.find({ addedBy: decoded });

  return farm;
};
