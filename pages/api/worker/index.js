import Farm from "../../../models/Farm";
import Worker from "../../../models/Worker";
import dbConnect from "../../../lib/dbConnect";

import jwt from "jsonwebtoken";

dbConnect();

// @route /api/worker
// @desc Get all workers of your farm

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  let farm = await Farm.findOne({ createdBy: decoded });

  switch (method) {
    case "GET":
      let workers = await Worker.find({ farmId: farm._id });
      res.send(workers);
      break;
    case "POST":
      try {
        let worker = new Worker({ ...req.body, farmId: farm._id });
        await worker.save();
        res.send(worker);
      } catch (error) {
        res.send({ message: error.message });
      }

      break;
    default:
      break;
  }
};
