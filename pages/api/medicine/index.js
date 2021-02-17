import dbConnect from "../../../lib/dbConnect";

import Farm from "../../../models/Farm";
import Medicine from "../../../models/Medicine";

import jwt from "jsonwebtoken";

dbConnect();

// @route /api/medicine

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  let farm = await Farm.findOne({ createdBy: decoded });

  switch (method) {
    case "GET":
      try {
        let medicines = await Medicine.find({ farmId: farm._id });

        res.send(medicines);
      } catch (error) {
        res.send({ message: error.message });
      }

      break;
    case "POST":
      try {
        let medicine = new Medicine({ ...req.body, farmId: farm._id });
        medicine.save();

        res.send(medicine);
      } catch (error) {
        res.send({ message: error.message });
      }
      break;
    default:
      break;
  }
};
