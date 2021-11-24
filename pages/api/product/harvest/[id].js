import dbConnect from "@/lib/dbConnect";
dbConnect();

import jwt from "jsonwebtoken";
import Product from "models/Product";
import Farm from "models/Farm";
import Pond from "models/Pond";

// @route /api/product/harvest/[id]
// Harvest product/ Add diaries

export default async (req, res) => {
  const { method } = req;

  const token = req.headers.authorization;

  const {
    query: { id },
  } = req;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const farm = await Farm.findOne({ createdBy: decoded });

  switch (method) {
    case "GET":
      let product = await Product.findById(id);

      let pond = await Pond.findOne({ _id: product.pond }).populate({
        path: "seed",
        populate: { path: "hatchery" },
      });
      res.send({ pond, product });

      break;

    default:
      break;
  }
};
