import dbConnect from "../../../lib/dbConnect";
dbConnect();

import jwt from "jsonwebtoken";

import UsingMedicine from "../../../models/UsingMedicine";
import Farm from "../../../models/Farm";
import Medicine from "models/Medicine";

// @route /api/usingmedicine

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let farm = await Farm.findOne({ themVaoBoi: decoded });

  switch (method) {
    case "GET":
      let all = await UsingMedicine.find({ farmId: farm._id }).populate([
        "ao",
        "nguoiTron",
        "thucAn",
        "thuoc",
      ]);
      res.send(all);
      break;
    case "POST":
      const { thuoc, khoiLuongThuoc } = req.body;

      try {
        // Reduce medicine quantity after using
        let medicine = await Medicine.findOne({ _id: req.body.thuoc });

        await Medicine.findOneAndUpdate(
          { _id: req.body.thuoc },
          { soLuong: medicine.soLuong - khoiLuongThuoc }
        );

        let usingMedicine = new UsingMedicine({
          ...req.body,
          farmId: farm._id,
        });

        await usingMedicine.save();

        res.send(usingMedicine);
      } catch (error) {
        res.send({ message: error.message });
      }

      break;
    default:
      break;
  }
};
