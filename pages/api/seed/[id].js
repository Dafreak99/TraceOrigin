import dbConnect from "@/lib/dbConnect.js";
dbConnect();

import Pond from "models/Pond";

import jwt from "jsonwebtoken";
import Seed from "@/models/Seed";

// @route /api/seed/[id]

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
    case "POST":
      try {
        console.log(id);
        await Seed.findOneAndUpdate({ _id: id }, req.body);

        res.send({ message: "OK" });
      } catch (error) {
        res.send({ message: error.message });
      }
      break;
    default:
      break;
  }
};
