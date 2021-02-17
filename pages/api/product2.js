import dbConnect from "../../lib/dbConnect";
import Farm from "../../models/Farm";
import Product from "../../models/Product";
import Seed from "../../models/Seed";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const {
      productName,
      productPrice,
      unit,
      image,
      weight,
      cultivateDate,
      harvestDate,
      farmName,
      farmOwner,
      farmImage,
      address,
      area,
      seedSellerCompanyName,
      seedSellerAddress,
      seedImportDate,
      ageOfSeed,
    } = req.body;

    // 1. Create farm and seed first

    let farm, seed, product;

    try {
      farm = new Farm({
        farmName,
        farmOwner,
        farmImage,
        address,
        area,
      });

      await farm.save();

      seed = new Seed({
        seedSellerCompanyName,
        seedSellerAddress,
        seedImportDate,
        ageOfSeed,
      });

      await seed.save();
    } catch (error) {
      console.log(error.message);
    }

    // 2. store their ID into product

    try {
      product = new Product({
        productName,
        productPrice,
        unit,
        image,
        weight,
        cultivateDate,
        harvestDate,
        farm: farm._id,
        seed: seed._id,
      });

      await product.save();
      res.send(product);
    } catch (error) {
      console.log(error);
    }
  } else if (method === "GET") {
    let products = await Product.find().populate("farm").populate("seed");

    res.send(products);
  }
};
