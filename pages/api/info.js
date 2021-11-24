import dbConnect from "../../lib/dbConnect";

dbConnect();

import Product from "../../models/Product";

export default async (req, res) => {
  // Deep population

  let products = await Product.find({ "isHarvested.status": "true" })
    .populate({ path: "pond", populate: { path: "seed" } })
    .populate({ path: "seed", populate: { path: "hatchery" } })
    .populate({ path: "farm", populate: { path: "authentication" } })
    .populate({ path: "feeding" })
    .populate({ path: "usingMedicine", populate: { path: "medicine" } });
  res.send(products);
};
