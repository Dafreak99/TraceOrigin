import dbConnect from "../../../lib/dbConnect";

import jwt from "jsonwebtoken";
import Hatchery from "models/Hatchery";
import Farm from "models/Farm";

dbConnect();

// @route /api/hatchery/:id
// @desc Get detail information of a specific hatchery

export default async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.query;

  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  switch (method) {
    case "GET":
      const hatchery = await Hatchery.findById(id);
      const farm = await Farm.findOne({ createdBy: hatchery.createdBy });

      res.send({ hatchery, farm });
      break;

    default:
      break;
  }
};
