import dbConnect from "../../lib/dbConnect";

dbConnect();

import Product from "../../models/Product";

export default async (req, res) => {
  // Deep population

  let product = await Product.findById("5fdc127a7ffb1f235c132d0b")
    .populate({ path: "pond", populate: { path: "seed" } })
    .populate({ path: "farm" })
    .populate({ path: "feeding" })
    .populate({ path: "usingMedicine", populate: { path: "thuoc" } });

  res.send(product);
};
