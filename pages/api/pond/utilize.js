import Pond from "../../../models/Pond";
import dbConnect from "../../../lib/dbConnect";
import Seed from "../../../models/Seed";

import jwt from "jsonwebtoken";

dbConnect();

// @route /api/pond/utillize
// POST request

export default async (req, res) => {
  const { method } = req;
  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  try {
    const { pondId } = req.body;

    let seed = new Seed({ ...req.body, isDone: false, isRegistered: false });

    await seed.save();

    await Pond.findOneAndUpdate({ _id: pondId }, { seed: seed._id });

    res.send({ message: "OK" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
