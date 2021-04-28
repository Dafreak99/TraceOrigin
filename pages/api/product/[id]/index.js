import dbConnect from "@/lib/dbConnect";
dbConnect();

import Product from "models/Product";

// @route /api/product/:id
// GET A specific(harvested) product by ProductID

export default async (req, res) => {
  const { method } = req;

  const {
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      // const product = await Product.findOne({
      //   _id: id,
      //   "isHarvested.status": "true",
      // })
      //   .populate({ path: "pond", populate: { path: "seed" } })
      //   .populate({ path: "seed", populate: { path: "hatchery" } })
      //   .populate({ path: "farm", populate: { path: "authentication" } })
      //   .populate({ path: "feeding" })
      //   .populate({ path: "usingMedicine", populate: { path: "medicine" } });

      // res.send(product);
      // NEW

      let product = await Product.findOne({
        _id: id,
        "isRegistered.status": "pending",
      })
        .populate({
          path: "pond",
          populate: { path: "seed" },
        })
        .populate("farm");

      res.send(product);

      break;

    default:
      break;
  }
};
