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
        const { pondId } = req.body;

        // How to know which Product is linked to this pond ?
        // For each pond, only one product can be register at a time
        // Find a product which has that pondId and isHarvested !== 'true'

        let product = await Product.findOne({
          pond: pondId,
        }).sort({ _id: -1 });
        // Get lastest one

        // Doesn't register for Product yet

        if (!product) {
          await Seed.deleteOne({ pondId });
          await Pond.findByIdAndDelete(pondId);
          return res.send({ message: "Đã xóa thành công ao !" });
        }

        if (product.isHarvested === "true") {
          // Archive to keep the link from Product to Pond after harvested
          await Pond.findByIdAndUpdate(pondId, { isArchived: true });
          await Seed.findOneAndUpdate({ pondId }, { isDone: true });
        } else {
          // When deleting a pond make sure to perform cascade delete in Product, Seed, FeedingDiary and UsingMediicne
          await Product.deleteOne(product._id);
          await FeedingDiary.deleteMany({ ao: pondId });
          await UsingMedicine.deleteMany({ ao: pondId });
          await Seed.deleteOne({ pondId });
          await Pond.findByIdAndDelete(pondId);
        }

        res.send({ message: "Đã xóa thành công ao !" });
      } catch (error) {
        res.send({ message: error.message });
      }
    default:
      break;
  }
};
