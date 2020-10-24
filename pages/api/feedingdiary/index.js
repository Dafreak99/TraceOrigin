import FeedingDiary from "../../../models/FeedingDiary";
import dbConnect from "../../../lib/dbConnect";

import jwt from "jsonwebtoken";

dbConnect();

// @route /api/feedingdiary
// @desc Add feeding diary everyday

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  switch (method) {
    case "GET":
      break;
    case "POST":
      try {
        console.log(req.body);
        let feedingDiary = new FeedingDiary(req.body);

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
