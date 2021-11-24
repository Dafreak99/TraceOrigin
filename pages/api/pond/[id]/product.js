import Product from "@/models/Product";
import dbConnect from "lib/dbConnect";
dbConnect();

// import Product from "models/Product";

// @route /api/product/:id
// GET A specific(unharvested) product by PondID

export default async (req, res) => {
  const { method } = req;

  const {
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      const product = await Product.findOne({
        pond: id,
        "isHarvested.status": { $ne: "true" },
      })
        .populate("isRegistered.reject")
        .populate("isHarvested.reject")
        .populate({ path: "pond", populate: { path: "seed" } })
        .populate({ path: "seed", populate: { path: "hatchery" } });

      res.send(product);

      break;

    default:
      break;
  }
};
