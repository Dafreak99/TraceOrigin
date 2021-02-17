import dbConnect from "../../../lib/dbConnect";

import jwt from "jsonwebtoken";
import Business from "models/Business";
import Packing from "models/Packing";

dbConnect();

// @route /api/packing/id

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let business = await Business.findOne({ createdBy: decoded });

  const {
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      let packing = await Packing.findById(id);
      res.send(packing);
      break;
    case "DELETE":
      try {
        await Packing.findByIdAndRemove(id);
        res.send({ message: "OK" });
      } catch (error) {
        res.send({ message: error.message });
      }
    case "PUT":
      try {
        await Packing.findOneAndUpdate({ _id: id }, req.body);
        res.send({ message: "OK" });
      } catch (error) {
        res.send({ message: error.message });
      }
      break;
      break;
    default:
      break;
  }
};
