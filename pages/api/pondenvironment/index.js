import dbConnect from "@/lib/dbConnect";
dbConnect();

import PondEnvironment from "../../../models/PondEnvironment";
import Farm from "../../../models/Farm";

import jwt from "jsonwebtoken";
import Product from "@/models/Product";

// @route /api/pondenvironment

export default async (req, res) => {
  const { method } = req;
  const token = req.headers.authorization;

  // if (!token)
  //   return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const farm = await Farm.findOne({ createdBy: decoded });

  switch (method) {
    case "GET":
      break;
    case "POST":
      try {
        const { pond } = req.body;

        const product = await Product.findOne({ pond }).sort({
          id: -1,
        });

        const pondEnv = new PondEnvironment({
          ...req.body,
          farmId: farm._id,
          productId: product._id,
        });

        await pondEnv.save();
        res.send(pondEnv);
      } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
      }
      break;
    default:
      break;
  }
};
