import dbConnect from "../../../lib/dbConnect";

import jwt from "jsonwebtoken";
import Business from "models/Business";
import ProcessingFacility from "models/ProcessingFacility";

dbConnect();

// @route /api/processingfacility
// @desc Get detail information about your hatcheries

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let business = await Business.findOne({ themVaoBoi: decoded });

  switch (method) {
    case "GET":
      let processingFacilities = await ProcessingFacility.find({
        businessId: business._id,
      });
      res.send(processingFacilities);
      break;
    case "POST":
      try {
        let processingFacility = new ProcessingFacility({
          ...req.body,
          businessId: business._id,
        });
        await processingFacility.save();
        res.send(processingFacility);
      } catch (error) {
        res.send({ message: error.message });
      }
      break;
    default:
      break;
  }
};
