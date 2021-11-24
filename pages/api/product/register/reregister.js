import dbConnect from "@/lib/dbConnect";
dbConnect();

import jwt from "jsonwebtoken";
import Product from "models/Product";
import Farm from "models/Farm";

// @route /api/product/harvest/reject
// Reject register

export default async (req, res) => {
  const { method } = req;

  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const farm = await Farm.findOne({ createdBy: decoded });

  switch (method) {
    case "POST":
      try {
        const { id } = req.body;

        await Product.findByIdAndUpdate(id, {
          "isRegistered.status": "pending",
          "isRegistered.reject": null,
        });

        res.send({ message: "OK" });
      } catch (error) {
        console.log(error.message);
        res.send({ message: error.message });
      }

      break;
    default:
      break;
  }
};
