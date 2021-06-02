import dbConnect from "@/lib/dbConnect";
dbConnect();

import jwt from "jsonwebtoken";
import Product from "models/Product";
import Farm from "models/Farm";

import Seed from "models/Seed";

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
        "isRegistered.status": "true",
        isHarvested: null,
      }).populate({
        path: "pond",
        populate: { path: "seed" },
      });

      res.send(products);

      break;
    case "POST":
      let { id } = req.body;

      const product = await Product.findOneAndUpdate(
        { _id: id },
        { "isRegistered.status": "true", qrCode: id },
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
