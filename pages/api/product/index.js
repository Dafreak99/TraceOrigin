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

// @route /api/product

export default async (req, res) => {
  const { method } = req;

  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const farm = await Farm.findOne({ themVaoBoi: decoded });

  switch (method) {
    case "GET":
      let products = await Product.find({ farm: farm.id }).populate({
        path: "pond",
        populate: { path: "seed" },
      });
      res.send(products);

      break;
    case "POST":
      try {
        const product = new Product({
          ...req.body,
          farm: farm.id,
          duyetDangKy: false,
        });

        await product.save();

        res.send(product);

        // const feeding = await FeedingDiary.find({ ao: req.body.pond });
        // const usingMedicine = await UsingMedicine.find({
        //   ao: req.body.pond,
        // });

        // const seed = await Seed.findOne({ pondId: req.body.pond });

        // const product = new Product({
        //   ...req.body,
        //   farm: farm._id,
        //   feeding,
        //   usingMedicine,
        //   seed,
        //   processingFacility: null,
        // });

        // // Unlink to refresh data
        // await FeedingDiary.updateMany({ ao: req.body.pond }, { isDone: true });
        // await UsingMedicine.updateMany({ ao: req.body.pond }, { isDone: true });
        // await Pond.findOneAndUpdate({ _id: req.body.pond }, { seed: null });

        // await product.save();
        // res.send({ message: "OK" });
      } catch (error) {
        console.log(error.message);
        res.send({ message: error.message });
      }

      break;
    default:
      break;
  }
};
