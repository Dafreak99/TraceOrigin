import dbConnect from "../../../lib/dbConnect";

import jwt from "jsonwebtoken";
import Farm from "models/Farm";
import Packing from "models/Packing";
import Product from "models/Product";

dbConnect();

// @route /api/packingmethod
// @desc Add packing method to a product

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let farm = await Farm.findOne({ createdBy: decoded });

  switch (method) {
    case "GET":
      break;
    case "POST":
      try {
        const packingMethod = new Packing({ ...req.body, farmId: farm._id });

        await packingMethod.save();

        await Product.findOneAndUpdate(
          { _id: req.body.productId },
          { packingMethod }
        );

        res.send(packing);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
      break;

    default:
      break;
  }
};
