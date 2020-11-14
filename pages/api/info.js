import dbConnect from "../../lib/dbConnect";

dbConnect();

import Product from "../../models/Product";

export default async (req, res) => {
  // Deep population

  let product = await Product.find()
    .populate({ path: "pond", populate: { path: "seed" } })
    .populate({ path: "farm" });

  res.send(product);
};
