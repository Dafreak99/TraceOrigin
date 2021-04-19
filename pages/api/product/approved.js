import dbConnect from "../../../lib/dbConnect";
dbConnect();

import Food from "../../../models/Food";

import jwt from "jsonwebtoken";
import Product from "models/Product";
import Farm from "models/Farm";
import FeedingDiary from "models/FeedingDiary";
import UsingMedicine from "models/UsingMedicine";
import Seed from "models/Seed";
import Pond from "models/Pond";

// @route /api/product/approved
// Get approved product

export default async (req, res) => {
  const { method } = req;

  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const farm = await Farm.findOne({ createdBy: decoded });

  switch (method) {
    case "GET":
      let products = await Product.find({
        farm: farm._id,
        isRegistered: "true",
        isHarvested: null,
      }).populate({
        path: "pond",
        populate: { path: "seed" },
      });

      res.send(products);

      break;
    case "POST":
      let { id } = req.body;

      // let product = await Product.findById(id);

      // const product = await Product.findOne({ _id: id });
      // const seed = await Seed.findOne({ _id: product.seed });

      // console.log("Product", product);
      // console.log("Seed", seed);
      // });
      const product = await Product.findOneAndUpdate(
        { _id: id },
        { isRegistered: "true", qrCode: id },
        { new: true }
      );

      await Seed.findOneAndUpdate(
        { _id: product.seed },
        { isRegistered: "true" }
      );

      res.send({ message: "OK" });

      break;
    default:
      break;
  }
};
