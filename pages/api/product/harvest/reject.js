import dbConnect from "@/lib/dbConnect";
dbConnect();

import jwt from "jsonwebtoken";
import Product from "models/Product";
import RejectMessage from "@/models/RejectMessage";

// @route /api/product/harvest/reject
// POST: Reject the harvest of a product

export default async (req, res) => {
  const { method } = req;

  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  switch (method) {
    case "POST":
      /**
       * * Reject harvest from Farmer
       */

      const { id, message, type, createdAt } = req.body;

      const rejectMessage = new RejectMessage({ message, type, createdAt });

      await rejectMessage.save();

      await Product.findOneAndUpdate(
        { _id: req.body.id },
        {
          feeding: [],
          usingMedicine: [],
          dailyNote: [],
          pondEnvironment: [],
          images: [],
          name: null,
          "isHarvested.status": "false",
          "isHarvested.harvestProduct": null,
          "isHarvested.reject": rejectMessage,
        }
      );

      res.send({ message: "OK" });
      break;

    default:
      break;
  }
};
