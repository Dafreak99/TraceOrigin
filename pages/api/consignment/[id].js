import dbConnect from "../../../lib/dbConnect";

import jwt from "jsonwebtoken";
import Business from "models/Business";
import Consignment from "models/Consignment";

dbConnect();

// @route /api/consignment/id

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
      let consignment = await Consignment.findById(id);
      res.send(consignment);
      break;
    case "DELETE":
      try {
        await Consignment.findByIdAndRemove(id);
        res.send({ message: "OK" });
      } catch (error) {
        res.send({ message: error.message });
      }
    case "PUT":
      try {
        await Consignment.findOneAndUpdate({ _id: id }, req.body);
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
