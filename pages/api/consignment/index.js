import dbConnect from "../../../lib/dbConnect";

import jwt from "jsonwebtoken";
import Business from "models/Business";
import Consignment from "models/Consignment";

dbConnect();

// @route /api/consignment

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let business = await Business.findOne({ createdBy: decoded });

  switch (method) {
    case "GET":
      let consignments = await Consignment.find({
        businessId: business._id,
      }).populate("sanPham");
      res.send(consignments);
      break;
    case "POST":
      try {
        console.log(req.body);

        let consignment = new Consignment({
          ...req.body,
          businessId: business._id,
        });
        await consignment.save();
        res.send(consignment);
      } catch (error) {
        res.send({ message: error.message });
      }
      break;
    default:
      break;
  }
};
