import dbConnect from "../../../../lib/dbConnect";
dbConnect();

import jwt from "jsonwebtoken";
import Product from "models/Product";
import Farm from "models/Farm";
import FeedingDiary from "models/FeedingDiary";
import UsingMedicine from "models/UsingMedicine";
import Seed from "models/Seed";
import Pond from "models/Pond";

// @route /api/product/jarvest
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
        isHarvested: ["true", "pending"],
      }).populate({ path: "seed", populate: "hatchery" });

      res.send(products);
      break;
    case "POST":
      try {
        const feeding = await FeedingDiary.find({
          pond: req.body.pond,
          isDone: false,
        });

        const usingMedicine = await UsingMedicine.find({
          pond: req.body.pond,
          isDone: false,
        });

        const seed = await Seed.findOne({ pondId: req.body.pond });

        await Product.findOneAndUpdate(
          { _id: req.body.productId },
          {
            ...req.body,
            usingMedicine,
            feeding,
            seed,
            processingFacility: null,
            isHarvested: "pending",
          }
        );

        // Unlink to refresh data
        await FeedingDiary.updateMany({ ao: req.body.pond }, { isDone: true });
        await UsingMedicine.updateMany({ ao: req.body.pond }, { isDone: true });
        await Pond.findOneAndUpdate({ _id: req.body.pond }, { seed: null });

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
