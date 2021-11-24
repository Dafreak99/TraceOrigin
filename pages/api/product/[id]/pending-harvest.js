import dbConnect from "@/lib/dbConnect";
dbConnect();

import Product from "models/Product";

// @route /api/product/:id/harvest
// GET A specific(unharvested) product by ProductID

export default async (req, res) => {
  const { method } = req;

  const {
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      const product = await Product.findOne({
        _id: id,
        "isHarvested.status": "pending",
      })
        .populate("farm")
        .populate({ path: "pond", populate: { path: "seed" } })
        .populate({ path: "seed", populate: { path: "hatchery" } })
        .populate({ path: "feeding", populate: { path: "food" } })
        .populate({
          path: "usingMedicine",
          populate: { path: "medicine" },
        })
        .populate({ path: "dailyNote" })
        .populate({ path: "pondEnvironment" })
        .populate({ path: "replaceWater" })
        .populate({ path: "isHarvested", populate: "harvestProduct" });

      res.send(product);

      break;

    default:
      break;
  }
};
