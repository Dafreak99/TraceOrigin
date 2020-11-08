import FeedingDiary from "../../../models/FeedingDiary";
import dbConnect from "../../../lib/dbConnect";

import jwt from "jsonwebtoken";
import Farm from "models/Farm";

dbConnect();

// @route /api/feedingdiary
// @desc Add feeding diary everyday

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let farm = await Farm.findOne({ themVaoBoi: decoded });

  switch (method) {
    case "GET":
      try {
        let feedingDiaries = await FeedingDiary.find({
          coSoNuoi: farm._id,
        }).populate(["ao", "thucAn", "coSoNuoi"]);

        res.send(feedingDiaries);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
      break;
    case "POST":
      try {
        let feedingDiary = new FeedingDiary({
          ...req.body,
          coSoNuoi: farm._id,
        });

        await feedingDiary.save();
        res.send({ message: "OK" });
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
      break;
    default:
      break;
  }
};
