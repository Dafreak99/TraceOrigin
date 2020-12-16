import dbConnect from "../../../lib/dbConnect";
dbConnect();

import Food from "../../../models/Food";

import jwt from "jsonwebtoken";
import Product from "models/Product";
import Farm from "models/Farm";
import FeedingDiary from "models/FeedingDiary";
import UsingMedicine from "models/UsingMedicine";

// @route /api/food

export default async (req, res) => {
  const { method } = req;

  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const farm = await Farm.findOne({ themVaoBoi: decoded });

  switch (method) {
    case "GET":
      // temporary test one first
      let product = await Product.findOne({
        _id: "5f5d97cbdf4ab92994ee8f07",
      })
        .populate({ path: "pond", populate: { path: "seed" } })
        .populate({ path: "farm" });

      res.send(product);

      break;
    case "POST":
      try {
        let feeding = await FeedingDiary.find({ ao: req.body.pond });
        let usingMedicine = await UsingMedicine.find({
          ao: req.body.pond,
        });

        let product = new Product({
          ...req.body,
          farm: farm._id,
          feeding,
          usingMedicine,
        });

        console.log(product);

        await product.save();
        res.send({ message: "OK" });
      } catch (error) {
        console.log(error.message);
        res.send({ message: error.message });
      }

      break;
    default:
      break;
  }
};
