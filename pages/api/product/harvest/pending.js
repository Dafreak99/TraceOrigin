import dbConnect from "../../../../lib/dbConnect";
dbConnect();

import jwt from "jsonwebtoken";
import Product from "models/Product";
import Farm from "models/Farm";

// @route /api/product/harvest/pending
//  Get pending product waiting for harvest acceptance

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
        isHarvested: "pending",
      }).populate({
        path: "pond",
        populate: { path: "seed" },
      });
      res.send(products);
      break;

    default:
      break;
  }
};
