import dbConnect from "@/lib/dbConnect";
dbConnect();

import jwt from "jsonwebtoken";
import Product from "models/Product";
import Farm from "models/Farm";
import Seed from "models/Seed";
import RejectMessage from "@/models/RejectMessage";

// @route /api/product/register/reject
// POST: Reject the registration of a product

export default async (req, res) => {
  const { method } = req;

  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  switch (method) {
    case "POST":
      /**
       * * Reject registration from Farmer
       */
      try {
        const { id, message, type, createdAt } = req.body;

        const rejectMessage = new RejectMessage({ message, type, createdAt });

        await rejectMessage.save();

        const product = await Product.findByIdAndUpdate(
          id,
          {
            "isRegistered.status": "false",
            "isRegistered.reject": rejectMessage,
          },
          { new: true }
        );
        await Seed.findByIdAndUpdate(product.seed, { isRegistered: "false" });

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
