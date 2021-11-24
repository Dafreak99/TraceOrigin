import dbConnect from "@/lib/dbConnect";
dbConnect();

import Product from "models/Product";

// @route /api/product/unapproved
// Get unapproved products

export default async (req, res) => {
  const { method } = req;

  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  switch (method) {
    case "GET":
      let products = await Product.find({
        "isRegistered.status": "pending",
      })
        .populate({
          path: "pond",
          populate: { path: "seed" },
        })
        .populate("farm");

      res.send(products);

      break;
    default:
      break;
  }
};
