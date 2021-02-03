import dbConnect from "../../../../lib/dbConnect";
dbConnect();

import jwt from "jsonwebtoken";
import Product from "models/Product";
import Farm from "models/Farm";
import Seed from "models/Seed";

// @route /api/product/harvest/pending
//  Get pending product waiting for harvest acceptance

export default async (req, res) => {
  const { method } = req;

  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const farm = await Farm.findOne({ themVaoBoi: decoded });

  switch (method) {
    case "POST":
      let product = await Product.findById(req.body.id);

      await Seed.findByIdAndUpdate(product.seed, { isDone: true });

      await Product.findOneAndUpdate(
        { _id: req.body.id },
        {
          duyetThuHoach: "true",
        }
      );

      res.send({ message: "OK" });
      break;

    default:
      break;
  }
};
