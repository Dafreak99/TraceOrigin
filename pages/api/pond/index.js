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
        // Find a product which has that pondId and isHarvested.status !== 'true'

        let unharvestedProduct = await Product.findOne({
          pond,
          "isRegistered.status": ["pending", "false"],
        }); // {}

        let harvestedproducts = await Product.find({
          pond,
          "isRegistered.status": ["true"],
        }); // []

        if (unharvestedProduct && harvestedproducts.length === 0) {
          await Product.findByIdAndRemove(unharvestedProduct._id);
          await FeedingDiary.deleteMany({ pond });
          await UsingMedicine.deleteMany({ pond });
          await Seed.deleteOne({ pond });
          await Pond.findByIdAndDelete(pond);
        } else if (!unharvestedProduct && harvestedproducts.length > 0) {
          // Archive to keep the link from Product to Pond of the harvested products
          await Pond.findByIdAndUpdate(pond, { isArchived: true });
          await Seed.findOneAndUpdate({ pond }, { isDone: true });
        } else if (!unharvestedProduct && harvestedproducts.length === 0) {
          await Seed.deleteOne({ pond });
          await Pond.findByIdAndDelete(pond);
        } else {
          // Delete log of an unharvested product
          await Product.findByIdAndRemove(unharvestedProduct._id);
          await FeedingDiary.deleteMany({ pond, isDone: false });
          await UsingMedicine.deleteMany({ pond, isDone: false });
          // Archive to keep the link from Product to Pond of the harvested products
          await Pond.findByIdAndUpdate(pond, { isArchived: true });
          await Seed.findOneAndUpdate({ pond }, { isDone: true });
          console.log("4");
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
