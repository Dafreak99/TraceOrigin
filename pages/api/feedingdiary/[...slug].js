import FeedingDiary from "../../../models/FeedingDiary";
import dbConnect from "@/lib/dbConnect";

import jwt from "jsonwebtoken";
import Farm from "models/Farm";
import Food from "models/Food";

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
      const { slug } = req.query;

      const [state, pondId] = slug[0].split("||");

      try {
        let feedingDiaries;
        if (pondId !== "*") {
          feedingDiaries = await FeedingDiary.find({
            farm: farm._id,
            isDone: state === "false",
            pond: pondId,
          }).populate(["pond", "food", "farm"]);
        } else {
          feedingDiaries = await FeedingDiary.find({
            farm: farm._id,
            isDone: state === "false",
          }).populate(["pond", "food", "farm"]);
        }

        res.send(feedingDiaries);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
      break;

    default:
      break;
  }
};
