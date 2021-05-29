import dbConnect from "@/lib/dbConnect";
dbConnect();

import Product from "models/Product";

// @route /api/product/finish

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      let products = await Product.find({ "isHarvested.status": "true" })
        .populate({
          path: "farm",
          populate: { path: "authentication" },
        })
        .populate({
          path: "pond",
        })
        .populate({ path: "seed", populate: { path: "hatchery" } })
        .populate({ path: "feeding", populate: { path: "food" } })
        .populate({
          path: "usingMedicine",
          populate: { path: "medicine" },
        })
        .populate({ path: "dailyNote" })
        .populate({ path: "pondEnvironment" })
        .populate({ path: "isHarvested", populate: "harvestProduct" });

      res.send(products);

      break;

    default:
      break;
  }
};
