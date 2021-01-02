import dbConnect from "../../../lib/dbConnect";

import Business from "../../../models/Business";
import Farm from "../../../models/Farm";

import jwt from "jsonwebtoken";
import Product from "models/Product";

dbConnect();

// @route /api/business
// @desc Get detail information of your farm

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        let business = await Business.findById("5fd96b00f6b4c120583681ab");

        let product = await Product.find({
          farm: business.farm,
          processingFacility: null,
        });

        res.send({ business, product });
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
