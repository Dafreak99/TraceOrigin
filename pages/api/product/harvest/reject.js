import dbConnect from "../../../../lib/dbConnect";
dbConnect();

import jwt from "jsonwebtoken";
import Product from "models/Product";
import FeedingDiary from "models/FeedingDiary";
import UsingMedicine from "models/UsingMedicine";
import Pond from "models/Pond";

// @route /api/product/harvest/reject
// POST: Reject the harvest of a product

export default async (req, res) => {
  const { method } = req;

  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  switch (method) {
    case "POST":
      let product = await Product.findOne({ _id: req.body.id });

      // Link to refresh data
      await FeedingDiary.updateMany({ ao: req.body.pond }, { isDone: false });
      await UsingMedicine.updateMany({ ao: req.body.pond }, { isDone: false });
      await Pond.findOneAndUpdate(
        { _id: req.body.pond },
        { seed: product.seed }
      );

      await Product.findOneAndUpdate(
        { _id: req.body.id },
        {
          usingMedicine: [],
          feeding: [],
          seed: null,
          donVi: null,
          harvestedDate: null,
          weight: null,
          images: [],
          "isHarvested.status": "false",
        }
      );

      res.send({ message: "OK" });
      break;

    default:
      break;
  }
};
