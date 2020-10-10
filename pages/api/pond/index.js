import Pond from "../../../models/Pond";
import dbConnect from "../../../lib/dbConnect";
import Farm from "../../../models/Farm";

import jwt from "jsonwebtoken";

dbConnect();

// @route /api/pond

export default async (req, res) => {
  const { method } = req;
  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const farm = await Farm.findOne({ addedBy: decoded });

  switch (method) {
    case "GET":
      let ponds = await Pond.find({ farmId: farm._id }).populate("seed");
      res.send(ponds);

      break;
    case "POST":
      try {
        let pond = new Pond({ ...req.body, farmId: farm._id });

        await pond.save();
        res.send(pond);
      } catch (error) {
        res.status(400).send({ message: error.message });
      }
      break;
    default:
      break;
  }
};
