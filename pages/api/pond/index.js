import dbConnect from "../../../lib/dbConnect";
dbConnect();

import Pond from "../../../models/Pond";
import Farm from "../../../models/Farm";

import jwt from "jsonwebtoken";
import FeedingDiary from "models/FeedingDiary";
import UsingMedicine from "models/UsingMedicine";
import Seed from "models/Seed";
import Product from "models/Product";

// @route /api/pond

export default async (req, res) => {
  const { method } = req;
  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const farm = await Farm.findOne({ createdBy: decoded });

  switch (method) {
    case "GET":
      let ponds = await Pond.find({
        farmId: farm._id,
        isArchived: false,
      }).populate({
        path: "seed",
        populate: { path: "hatchery" },
      });

      res.send({ ponds, isAuthenticated: farm.isAuthenticated });

      break;
    case "POST":
      try {
        let pond = new Pond({ ...req.body, farmId: farm._id });

        await pond.save();
        res.send(pond);
      } catch (error) {
        res.status(400).send({ message: error.message });
      }
      break;
    case "DELETE":
      try {
        const { pondId: pond } = req.body;

        // How to know which Product is linked to this pond ?
        // For each pond, only one product can be register at a time
        // Find a product which has that pondId and isHarvested !== 'true'

        let product = await Product.findOne({
          pond,
        }).sort({ _id: -1 });
        // Get lastest one

        // Doesn't register for Product yet

        if (!product) {
          await Seed.deleteOne({ pond });
          await Pond.findByIdAndDelete(pond);
          return res.send({ message: "Đã xóa thành công ao !" });
        }

        if (product.isHarvested.status === "true") {
          // Archive to keep the link from Product to Pond after harvested
          await Pond.findByIdAndUpdate(pond, { isArchived: true });
          await Seed.findOneAndUpdate({ pond }, { isDone: true });
        } else {
          // When deleting a pond make sure to perform cascade delete in Product, Seed, FeedingDiary and UsingMediicne

          await Product.findByIdAndRemove(product._id);
          await FeedingDiary.deleteMany({ pond });
          await UsingMedicine.deleteMany({ pond });
          await Seed.deleteOne({ pond });
          await Pond.findByIdAndDelete(pond);
        }

        res.send({ message: "Đã xóa thành công ao !" });
      } catch (error) {
        console.dir(error);
        console.log(error.message);
        res.send({ message: error.message });
      }
    default:
      break;
  }
};
