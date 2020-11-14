import dbConnect from "../../../lib/dbConnect";
dbConnect();

import Food from "../../../models/Food";

import jwt from "jsonwebtoken";
import Product from "models/Product";

// @route /api/food

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      // temporary test one first
      let product = await Product.findOne({
        _id: "5f5d97cbdf4ab92994ee8f07",
      })
        .populate({ path: "pond", populate: { path: "seed" } })
        .populate({ path: "farm" });

      res.send(product);

      break;
    case "POST":
      break;
    default:
      break;
  }
};
