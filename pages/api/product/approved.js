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

  const farm = await Farm.findOne({ themVaoBoi: decoded });

  switch (method) {
    case "GET":
      let products = await Product.find({
        farm: farm.id,
        duyetDangKy: true,
      }).populate({
        path: "pond",
        populate: { path: "seed" },
      });
      res.send(products);

      break;
    case "POST":
      let { id } = req.body;

      await Product.findOneAndUpdate(
        { _id: id },
        { duyetDangKy: true, qrCode: id }
      );

      res.send({ message: "OK" });

      break;
    default:
      break;
  }
};
