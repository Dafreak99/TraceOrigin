import dbConnect from "../../../lib/dbConnect";

import Business from "../../../models/Business";
import Farm from "../../../models/Farm";

import jwt from "jsonwebtoken";
import Product from "models/Product";

dbConnect();

// @route /api/business/product
// @desc Get detail information of your farm

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let business = await Business.findOne({ createdBy: decoded });
  switch (method) {
    case "GET":
      try {
        let products = await Product.find({
          farm: business.farm,
        });

        let processedProduct = products.filter(
          (product) => product.processingFacility !== null
        );

        res.send(processedProduct);
      } catch (error) {
        res.send(error.message);
      }
      break;
    case "POST":
      try {
        let business = new Business(req.body);
        await business.save();
        res.send({ message: "OK" });
      } catch (error) {
        res.send(erorr.message);
      }

      break;
    default:
      break;
  }
};
