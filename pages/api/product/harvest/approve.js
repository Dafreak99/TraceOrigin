import dbConnect from "@/lib/dbConnect";
dbConnect();

import jwt from "jsonwebtoken";
import Product from "models/Product";
import Farm from "models/Farm";
import Seed from "models/Seed";
import FeedingDiary from "@/models/FeedingDiary";
import UsingMedicine from "@/models/UsingMedicine";
import Note from "@/models/Note";
import PondEnvironment from "@/models/PondEnvironment";
import Pond from "@/models/Pond";
import { deployToBlockchain } from "@/lib/bigchain";

// @route /api/product/harvest/pending
// Get pending product waiting for harvest acceptance

export default async (req, res) => {
  const { method } = req;

  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  switch (method) {
    case "POST":
      const { productId, pondId } = req.body;

      /**
       ** Diaries: Set isDone to true
       */

      // await FeedingDiary.updateMany({ productId }, { isDone: true });
      // await UsingMedicine.updateMany({ productId }, { isDone: true });
      // await Note.updateMany({ productId }, { isDone: true });
      // await PondEnvironment.updateMany({ productId }, { isDone: true });
      /**
       ** Set ref of seed from pond to null
       ** since pond no longer has seed when after harvesting
       */

      // const pond = await Pond.findByIdAndUpdate(pondId, { seed: null });

      // await Seed.findByIdAndUpdate(pond.seed, { isDone: true });

      /**
       ** Product: Set isHarvested.status to true and populate to get full info
       */

      const product = await Product.findByIdAndUpdate(
        productId,
        { "isHarvested.status": "pending" },
        { new: true }
      )
        // .populate("farm")
        // .populate({ path: "pond" })
        // .populate({ path: "seed", populate: { path: "hatchery" } })
        // .populate({ path: "feeding", populate: { path: "food" } })
        // .populate({
        //   path: "usingMedicine",
        //   populate: { path: "medicine" },
        // })
        // .populate({ path: "dailyNote" })
        // .populate({ path: "pondEnvironment" })
        .populate({ path: "isHarvested", populate: "harvestProduct" });

      // deployToBlockchain(product);

      res.send(product);
      break;

    default:
      break;
  }
};
