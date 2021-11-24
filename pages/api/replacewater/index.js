import dbConnect from "@/lib/dbConnect";
dbConnect();

import jwt from "jsonwebtoken";

import ReplaceWater from "@/models/ReplaceWaterDiary";
import Farm from "@/models/Farm";
import Product from "@/models/Product";

// @route /api/replacewater

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let farm = await Farm.findOne({ createdBy: decoded });

  switch (method) {
    case "GET":
      let all = await ReplaceWater.find({
        farmId: farm._id,
        isDone: false,
      }).populate(["pond"]);
      res.send(all);
      break;
    case "POST":
      const { percentage, createdDate, pondId } = req.body;

      try {
        const product = await Product.findOne({
          pond: pondId,
          "isHarvested.status": { $ne: "true" },
        });

        let replaceWater = new ReplaceWater({
          createdDate,
          percentage,
          pond: pondId,
          farm: farm._id,
          productId: product._id,
          isDone: false,
        });

        await replaceWater.save();

        res.send({ message: "OK" });
      } catch (error) {
        console.log(error);
        res.send({ message: error.message });
      }

      break;

    case "DELETE":
      try {
        await UsingMedicine.findByIdAndDelete(req.body.id);

        res.send({ message: "OK" });
      } catch (error) {
        console.log(error.message);
        res.send({ messagee: error.message });
      }
      break;

    default:
      break;
  }
};
