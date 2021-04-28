import dbConnect from "../../../lib/dbConnect";
dbConnect();

import jwt from "jsonwebtoken";

import Product from "models/Product";
import Farm from "models/Farm";
import Seed from "models/Seed";
import Pond from "@/models/Pond";

// @route /api/product

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
        farm: farm.id,
        "isHarvested.status": [null, "false"],
      })
        .populate({ path: "pond", populate: { path: "seed" } })
        .populate({ path: "seed", populate: { path: "hatchery" } });

      res.send(products);

      break;
    case "POST":
      try {
        const { pond } = req.body;

        // Create seed and set it to pending
        const seed = new Seed({
          ...req.body,
          isDone: false,
          farmId: farm._id,
          isRegisterd: "pending",
          pond,
        });

        await seed.save();

        // Bind seed to pond
        const updatedPond = await Pond.findOneAndUpdate(
          { _id: pond },
          { seed: seed._id },
          { new: true }
        ).populate({ path: "seed", populate: { path: "hatchery" } });

        // Create product
        const product = new Product({
          pond,
          farm: farm.id,
          "isRegistered.status": "pending",
          isHarvested: null,
          seed,
        });

        await product.save();

        res.send({ pond: updatedPond, product });
      } catch (error) {
        console.log(error.message);
        res.send({ message: error.message });
      }
      break;
    case "DELETE":
      try {
        console.log(req.body.id);

        await Product.findByIdAndDelete(req.body.id);

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
