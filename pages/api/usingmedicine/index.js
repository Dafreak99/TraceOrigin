import dbConnect from "@/lib/dbConnect";
dbConnect();

import jwt from "jsonwebtoken";

import UsingMedicine from "../../../models/UsingMedicine";
import Farm from "../../../models/Farm";
import Medicine from "models/Medicine";
import Product from "models/Product";

// @route /api/usingmedicine

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let farm = await Farm.findOne({ createdBy: decoded });

  switch (method) {
    case "GET":
      let all = await UsingMedicine.find({
        farmId: farm._id,
        isDone: false,
      }).populate(["pond", "worker", "food", "medicine"]);
      res.send(all);
      break;
    case "POST":
      const {
        pondId,
        medicineId,
        foodId,
        weight,
        createdDate,
        mixingRatio,
        workerId,
      } = req.body;

      try {
        const product = await Product.findOne({ pond: pondId }).sort({
          id: -1,
        });

        // Reduce medicine quantity after using
        let medicine = await Medicine.findById(medicineId);

        await Medicine.findOneAndUpdate(
          { _id: medicineId },
          { weight: medicine.weight - weight }
        );

        let usingMedicine = new UsingMedicine({
          createdDate,
          medicine: medicineId,
          food: foodId,
          worker: workerId,
          pond: pondId,
          mixingRatio,
          weight,
          farmId: farm._id,
          productId: product._id,
          isDone: false,
        });

        await usingMedicine.save();

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
