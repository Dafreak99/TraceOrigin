import dbConnect from "../../../lib/dbConnect";

import jwt from "jsonwebtoken";
import ProcessingFacility from "models/ProcessingFacility";
import Farm from "models/Farm";

dbConnect();

// @route /api/processingfacility
// @desc Get detail information about your hatcheries

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let farm = await Farm.findOne({ createdBy: decoded });

  switch (method) {
    case "GET":
      let processingFacilities = await ProcessingFacility.find({
        farmId: farm._id,
      });
      res.send(processingFacilities);
      break;
    case "POST":
      try {
        let processingFacility = new ProcessingFacility({
          ...req.body,
          farmId: farm._id,
        });
        await processingFacility.save();
        res.send(processingFacility);
      } catch (error) {
        res.send({ message: error.message });
      }
      break;
    case "DELETE":
      try {
        await ProcessingFacility.findByIdAndDelete(req.body.id);

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
