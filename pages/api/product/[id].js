import dbConnect from "../../../lib/dbConnect";
dbConnect();

import Product from "models/Product";

// @route /api/product/:id

export default async (req, res) => {
  const { method } = req;

  const {
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      const product = await Product.findOne({ _id: id })
        .populate({
          path: "pond",
          populate: { path: "seed", populate: "hatchery" },
        })
        .populate({ path: "farm", populate: "authentication" })
        .populate({ path: "feeding", populate: "food" })
        .populate({ path: "usingMedicine", populate: { path: "medicine" } })
        .populate({ path: "seed", populate: "hatchery" });

      res.send(product);

      break;
    case "POST":
      break;

    default:
      break;
  }
};
