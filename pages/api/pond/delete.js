import Pond from "../../../models/Pond";
import dbConnect from "../../../lib/dbConnect";
import Farm from "../../../models/Farm";

import jwt from "jsonwebtoken";
import Seed from "../../../models/Seed";

dbConnect();

// @route /api/pond/delete

export default async (req, res) => {
  const { method } = req;
  const token = req.headers.authorization;

  const { pondId } = req.body;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  try {
    await Seed.findOneAndRemove({ pondId });

    await Pond.findOneAndRemove({ _id: pondId });
    res.send({ message: "Đã xóa thành công ao !" });

    // DELETE CASCADING
  } catch (error) {
    res.send({ message: error.message });
  }
};
