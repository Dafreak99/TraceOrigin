import FeedingDiary from "../../../models/FeedingDiary";
import dbConnect from "@/lib/dbConnect";

import jwt from "jsonwebtoken";
import Farm from "models/Farm";
import Note from "models/Note";
import Product from "@/models/Product";

dbConnect();

// @route /api/note
// @desc Add feeding diary everyday

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let farm = await Farm.findOne({ createdBy: decoded });

  switch (method) {
    case "GET":
      try {
        const notes = await Note.find();

        res.send(notes);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
      break;
    case "POST":
      try {
        const { pond } = req.body;

        const product = await Product.findOne({
          pond,
          "isHarvested.status": { $ne: "true" },
        });

        const note = new Note({
          ...req.body,
          farmId: farm._id,
          productId: product._id,
        });

        await note.save();

        res.send(note);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
      break;
    // case "DELETE":
    //   try {
    //     await FeedingDiary.findByIdAndDelete(req.body.id);

    //     res.send({ message: "OK" });
    //   } catch (error) {
    //     console.log(error.message);
    //     res.send({ messagee: error.message });
    //   }
    //   break;
    default:
      break;
  }
};
