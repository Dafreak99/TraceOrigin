import dbConnect from "@/lib/dbConnect.js";
dbConnect();

import Pond from "models/Pond";

import jwt from "jsonwebtoken";

// @route /api/pond/[id]

export default async (req, res) => {
  const { method } = req;
  const {
    query: { id },
  } = req;

  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  switch (method) {
    case "GET":
      let pond = await Pond.findOne({ _id: id }).populate({
        path: "seed",
        populate: { path: "hatchery" },
      });
      res.send(pond);
      break;
    case "POST":
      try {
        let pond = await Pond.findOneAndUpdate({ _id: id }, req.body, {
          new: true,
        }).populate({
          path: "seed",
          populate: { path: "hatchery" },
        });
        res.send(pond);
      } catch (error) {
        res.send({ message: error.message });
      }
      break;
    default:
      break;
  }
};
