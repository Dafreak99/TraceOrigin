import Farm from "../models/Farm";
import jwt from "jsonwebtoken";

export const getYourFarm = async (token) => {
  const decoded = jwt.verify(token, "lenient");

  let farm = await Farm.find({ addedBy: decoded });

  return farm;
};
