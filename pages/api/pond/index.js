import dbConnect from "../../../lib/dbConnect";
dbConnect();

import Pond from "../../../models/Pond";
import Farm from "../../../models/Farm";

import jwt from "jsonwebtoken";

// @route /api/pond

export default async (req, res) => {
  const { method } = req;
  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const farm = await Farm.findOne({ themVaoBoi: decoded });

  switch (method) {
    case "GET":
      // let pond = await Pond.findOne({ _id: "5f87113aa0e6d61860af5bcc" });
      // console.log(pond.seed);
      // let seed = await Seed.findById(pond.seed);
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
