import dbConnect from "../../../lib/dbConnect";

import jwt from "jsonwebtoken";
import Hatchery from "models/Hatchery";
import User from "models/User";

dbConnect();

// @route /api/hatchery/reject
// @desc POST Reject the suggested hatchery from a Farmer

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  switch (method) {
    case "POST":
      try {
      } catch (error) {
        console.log(error);
        res.send({ message: error.message });
      }
      break;

    default:
      break;
  }
};
