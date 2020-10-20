import Farm from "../models/Farm";
import Food from "../models/Food";
import jwt from "jsonwebtoken";

import dbConnect from "./dbConnect";

dbConnect();

export const getYourFarm = async (token) => {
  // TODO: Fix environment variable
  // Something wrong with the secret key
  // Problem: When fetching in client side from getStaticProps it doesn't know the process.env
  // Viable Solution: NEXT_PUBLIC_SECRET_KEY

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let farm = await Farm.find({ themVaoBoi: decoded });

  return farm;
};

export async function getAllFoodIds(token) {
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let farm = await Farm.find({ themVaoBoi: decoded });

  let foods = await Food.fine({ farmId: farm._id });

  return foods.map((food) => {
    return {
      params: {
        id: food._id,
      },
    };
  });
}
