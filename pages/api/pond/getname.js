import dbConnect from "../../../lib/dbConnect";
dbConnect();

import Pond from "../../../models/Pond";
import Farm from "../../../models/Farm";

import jwt from "jsonwebtoken";

// @route /api/pond/getname

export default async (req, res) => {
  const { method } = req;
  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const farm = await Farm.findOne({ createdBy: decoded });

  switch (method) {
    case "GET":
      let ponds = await Pond.find({
        farmId: farm._id,
        isArchived: false,
      }).select(["_id", "name"]);

      res.send(ponds);

      break;

    default:
      break;
  }
};
