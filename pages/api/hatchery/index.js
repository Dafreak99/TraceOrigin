import dbConnect from "../../../lib/dbConnect";

import jwt from "jsonwebtoken";
import Hatchery from "models/Hatchery";
import User from "models/User";

dbConnect();

// @route /api/hatchery
// @desc Get detail information about your hatcheries

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  switch (method) {
    case "GET":
      let defaultHatcheries = await Hatchery.find({
        createdBy: "60082f5b61aec103005fd68e", // Quanlity Control
      });
      let requestedHatcheries = await Hatchery.find({
        createdBy: { $ne: "60082f5b61aec103005fd68e" },
      }).populate("createdBy");

      res.send({ defaultHatcheries, requestedHatcheries });
      break;
    case "POST":
      try {
        const user = await User.findById(decoded);

        let hatchery = new Hatchery({
          ...req.body,
          createdBy: decoded,
          isApproved: user.type === "qualitycontrol" ? "true" : "pending",
        });
        await hatchery.save();
        res.send(hatchery);
      } catch (error) {
        console.log(error);
        res.send({ message: error.message });
      }
      break;
    case "PUT":
      try {
        const { _id, name, address, coordinate } = req.body;

        await Hatchery.findOneAndUpdate(_id, { name, address, coordinate });
        res.send({ message: "OK" });
      } catch (error) {
        console.log(error);
        res.send({ message: error.message });
      }
      break;
    case "DELETE":
      try {
        await Hatchery.findByIdAndDelete(req.body.id);

        res.send({ message: "OK" });
      } catch (error) {
        console.log(error.message);
        res.send({ messagee: error.message });
      }
      break;

    default:
      break;
  }
};
