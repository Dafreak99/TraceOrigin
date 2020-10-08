import jwt from "jsonwebtoken";

import Farm from "../../../models/Farm";
import dbConnect from "../../../lib/dbConnect";

dbConnect();

// @route /api/farm/modify
// @desc Add or update information of your farm

export default async (req, res) => {
  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let farm = await Farm.findOne({ addedBy: decoded });

  if (farm) {
    // Update farm info
    try {
      await Farm.updateOne({ addedBy: decoded }, req.body);
      res.send({ message: "OK", status: "200" });
    } catch (error) {
      res.send({ message: error.message, status: "500" });
    }
  } else {
    // Add new farm info

    try {
      let farm = new Farm({ ...req.body, addedBy: decoded });
      farm.save();
      res.send({ message: "OK", status: "201" });
    } catch (error) {
      res.send({ message: error.message, status: "500" });
    }
  }
};
