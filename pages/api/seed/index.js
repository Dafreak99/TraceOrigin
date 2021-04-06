import dbConnect from "../../../lib/dbConnect";
dbConnect();

import jwt from "jsonwebtoken";

import Farm from "models/Farm";
import Seed from "models/Seed";
import Pond from "models/Pond";

// @route /api/seed

export default async (req, res) => {
  const { method } = req;

  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const farm = await Farm.findOne({ createdBy: decoded });

  switch (method) {
    case "GET":
      let seeds = await Seed.find({ farmId: farm.id }).populate("hatchery");
      let ponds = await Pond.find({ farmId: farm.id });

      for (let i = 0; i < seeds.length; i++) {
        let pond = await Pond.findById(seeds[0].pondId);
        seeds.pondName = pond.name;
      }

      res.send(seeds);

      break;

    default:
      break;
  }
};
