import dbConnect from "../../../lib/dbConnect";
dbConnect();

import Product from "models/Product";

// @route /api/product/finish

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      let products = await Product.find({
        "isHarvested.status": "true",
      }).select(["name", "images"]);

      res.send(products);

      break;

    default:
      break;
  }
};
