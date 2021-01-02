import dbConnect from "../../../lib/dbConnect";
dbConnect();

import Pond from "../../../models/Pond";
import Farm from "../../../models/Farm";

import jwt from "jsonwebtoken";

// @route /api/pond

export default async (req, res) => {
  const { method } = req;
  const {
    query: { id },
  } = req;

  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const farm = await Farm.findOne({ themVaoBoi: decoded });

  switch (method) {
    case "GET":
      let pond = await Pond.findOne({ _id: id }).populate({
        path: "seed",
        populate: { path: "traiGiong" },
      });
      res.send(pond);
      break;
    case "POST":
      break;
    default:
      break;
  }
};
