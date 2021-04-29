import FeedingDiary from "../../../models/FeedingDiary";
import dbConnect from "@/lib/dbConnect";

import jwt from "jsonwebtoken";
import Farm from "models/Farm";
import Food from "models/Food";
import Product from "@/models/Product";

dbConnect();

// @route /api/feedingdiary
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
        let feedingDiaries = await FeedingDiary.find({
          farm: farm._id,
          isDone: false,
        }).populate(["pond", "food", "farm"]);

        res.send(feedingDiaries);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
      break;
    case "POST":
      try {
        const { pondId: pond } = req.body;

        const product = await Product.findOne({ pond }).sort({ id: -1 });

        let feedingDiary = new FeedingDiary({
          ...req.body,
          pond,
          farm: farm._id,
          productId: product._id,
          isDone: false,
        });

        await feedingDiary.save();

        // Reducing food quantity after feeding
        let food = await Food.findOne({ _id: req.body.food });

        await Food.findOneAndUpdate(
          { _id: req.body.food },
          { weight: food.weight - req.body.weight }
        );

        res.send({ message: "OK" });
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
      break;
    case "DELETE":
      try {
        await FeedingDiary.findByIdAndDelete(req.body.id);

        res.send({ message: "OK" });
      } catch (error) {
        console.log(error.message);
        res.send({ messagee: error.message });
      }
      break;
    default:
      break;
  }
};
