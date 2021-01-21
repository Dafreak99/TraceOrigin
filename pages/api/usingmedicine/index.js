import dbConnect from "../../../lib/dbConnect";
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

  let farm = await Farm.findOne({ themVaoBoi: decoded });

  switch (method) {
    case "GET":
      let all = await UsingMedicine.find({
        farmId: farm._id,
        isDone: false,
      }).populate(["ao", "nguoiTron", "thucAn", "thuoc"]);
      res.send(all);
      break;
    case "POST":
      const { thuoc, khoiLuongThuoc, sanPham } = req.body;

      try {
        let product = await Product.findById(sanPham);
        // Reduce medicine quantity after using
        let medicine = await Medicine.findOne({ _id: thuoc });

        await Medicine.findOneAndUpdate(
          { _id: req.body.thuoc },
          { soLuong: medicine.soLuong - khoiLuongThuoc }
        );

        let usingMedicine = new UsingMedicine({
          ...req.body,
          ao: product.pond,
          farmId: farm._id,
          isDone: false,
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
