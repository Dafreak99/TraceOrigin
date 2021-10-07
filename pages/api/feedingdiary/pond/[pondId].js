import dbConnect from "@/lib/dbConnect";

import jwt from "jsonwebtoken";
import Farm from "models/Farm";
import FeedingDiary from "models/FeedingDiary";

dbConnect();

// @route /api/feedingdiary/pond
// @desc Add feeding diary everyday

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  const { pondId } = req.query;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let farm = await Farm.findOne({ createdBy: decoded });

  switch (method) {
    case "GET":
      try {

        let feedingDiaries = await FeedingDiary.find({
          farm: farm._id,
          pond: pondId,
          isDone: false,
        }).sort([['createdDate']]);

        res.send(feedingDiaries);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
      break;

    default:
      break;
  }
};
