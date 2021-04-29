import dbConnect from "@/lib/dbConnect";
dbConnect();

import jwt from "jsonwebtoken";
import Product from "models/Product";
import Farm from "models/Farm";
import FeedingDiary from "models/FeedingDiary";
import UsingMedicine from "models/UsingMedicine";
import Seed from "models/Seed";
import Pond from "models/Pond";

// @route /api/product/harvest
// Harvest product/ Add diaries

export default async (req, res) => {
  const { method } = req;

  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const farm = await Farm.findOne({ createdBy: decoded });

  switch (method) {
    case "GET":
      // Get harvested products
      const products = await Product.find({
        farm: farm._id,
        "isHarvested.status": ["true", "pending"],
      })
        .populate({ path: "seed", populate: "hatchery" })
        .populate({ path: "packingMethod" });

      res.send(products);
      break;
    case "POST":
      try {
        const { pond } = req.body;

        const feeding = await FeedingDiary.find({
          pond,
          isDone: false,
        });

        const usingMedicine = await UsingMedicine.find({
          pond,
          isDone: false,
        });

        const seed = await Seed.findOne({ pond: req.body.pond });

        await Product.findOneAndUpdate(
          { _id: req.body.productId },
          {
            ...req.body,
            usingMedicine,
            feeding,
            seed: seed._id,
            "isHarvested.status": "pending",
          }
        );

        // Unlink to refresh data
        await FeedingDiary.updateMany({ pond }, { isDone: true });
        await UsingMedicine.updateMany({ pond }, { isDone: true });
        await Pond.findOneAndUpdate({ _id: pond }, { seed: null });

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
