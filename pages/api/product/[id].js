import dbConnect from "../../../lib/dbConnect";
dbConnect();

import Food from "../../../models/Food";

import jwt from "jsonwebtoken";
import Product from "models/Product";
import Farm from "models/Farm";
import FeedingDiary from "models/FeedingDiary";
import UsingMedicine from "models/UsingMedicine";
import Seed from "models/Seed";

// @route /api/product/:id

export default async (req, res) => {
  const { method } = req;

  const {
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      const product = await Product.findOne({ _id: id })
        .populate({
          path: "pond",
          populate: { path: "seed", populate: "hatchery" },
        })
        .populate({ path: "farm", populate: "authentication" })
        .populate({ path: "feeding", populate: "food" })
        .populate({ path: "usingMedicine", populate: { path: "medicine" } })
        .populate({ path: "seed", populate: "hatchery" });

      res.send(product);

      break;
    case "POST":
      break;
    case "PUT":
      await Product.findByIdAndUpdate(id, {
        processingFacility: req.body.processingFacility,
      });

      res.send({ message: "OK" });
      break;

    default:
      break;
  }
};
