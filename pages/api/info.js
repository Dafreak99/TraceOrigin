import dbConnect from "../../lib/dbConnect";

dbConnect();

import Product from "../../models/Product";

export default async (req, res) => {
  // Deep population

  let product = await Product.findById("5ff82010191514159058dc6a")
    .populate({ path: "pond", populate: { path: "seed" } })
    .populate({ path: "seed", populate: { path: "traiGiong" } })
    .populate({ path: "farm" })
    .populate({ path: "feeding" })
    .populate({ path: "usingMedicine", populate: { path: "thuoc" } });
  res.send(product);
};
