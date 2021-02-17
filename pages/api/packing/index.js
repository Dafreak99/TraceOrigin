import dbConnect from "../../../lib/dbConnect";

import jwt from "jsonwebtoken";
import Business from "models/Business";
import Packing from "models/Packing";

dbConnect();

// @route /api/packing

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let business = await Business.findOne({ createdBy: decoded });

  switch (method) {
    case "GET":
      let packing = await Packing.find({ businessId: business._id });
      res.send(packing);
      break;
    case "POST":
      try {
        let packing = new Packing({ ...req.body, businessId: business._id });
        await packing.save();
        res.send(packing);
      } catch (error) {
        res.send({ message: error.message });
      }
      break;
    default:
      break;
  }
};
