import dbConnect from "@/lib/dbConnect";
import Product from "models/Product";
dbConnect();

// @route /api/product/:id
// GET A specific(harvested) product by ProductID

export default async (req, res) => {
  const { method } = req;

  const {
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      let product = await Product.findOne({
        _id: id,
        "isRegistered.status": "pending",
      })
        .populate({
          path: "pond",
          populate: { path: "seed", populate: { path: "hatchery" } },
        })
        .populate("farm");

      res.send(product);

      break;

    default:
      break;
  }
};
