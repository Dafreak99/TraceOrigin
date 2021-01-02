import dbConnect from "../../../lib/dbConnect";
dbConnect();

import Pond from "../../../models/Pond";
import Farm from "../../../models/Farm";

import jwt from "jsonwebtoken";
import FeedingDiary from "models/FeedingDiary";
import UsingMedicine from "models/UsingMedicine";
import Seed from "models/Seed";

// @route /api/pond

export default async (req, res) => {
  const { method } = req;
  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const farm = await Farm.findOne({ themVaoBoi: decoded });

  switch (method) {
    case "GET":
      let ponds = await Pond.find({ farmId: farm._id }).populate("seed");

      res.send(ponds);

      break;
    case "POST":
      try {
        let pond = new Pond({ ...req.body, farmId: farm._id });

        await pond.save();
        res.send(pond);
      } catch (error) {
        res.status(400).send({ message: error.message });
      }
      break;
    case "DELETE":
      try {
        const { pondId } = req.body;
        // When deleting a pond make sure to perform cascade delete in Seed, FeedingDiary and UsingMediicne

        await Seed.deleteOne({ pondId });
        await FeedingDiary.deleteMany({ ao: pondId });
        await UsingMedicine.deleteMany({ ao: pondId });
        await Pond.findByIdAndDelete(pondId);

        res.send({ message: "Đã xóa thành công ao !" });

        // DELETE CASCADING
      } catch (error) {
        res.send({ message: error.message });
      }
    default:
      break;
  }
};
