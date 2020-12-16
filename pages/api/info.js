import dbConnect from "../../lib/dbConnect";

dbConnect();

import Product from "../../models/Product";

export default async (req, res) => {
  // Deep population

  let product = await Product.findById("5fd8d40f3b4f761778a48060")
    .populate({ path: "pond", populate: { path: "seed" } })
    .populate({ path: "farm" })
    .populate({ path: "feeding" })
    .populate({ path: "usingMedicine" });

  res.send(product);
};
