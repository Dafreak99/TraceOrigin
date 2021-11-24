import jwt from "jsonwebtoken";

import Pond from "../../../models/Pond";
import dbConnect from "@/lib/dbConnect";
import Seed from "../../../models/Seed";
import Farm from "models/Farm";

dbConnect();

// @route /api/pond/utillize
// POST request

export default async (req, res) => {
  const { method } = req;
  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const farm = await Farm.findOne({ createdBy: decoded });

  try {
    const { pondId } = req.body;

    const seed = new Seed({
      ...req.body,
      isDone: false,
      farmId: farm._id,
      pond: pondId,
    });

    await seed.save();

    const pond = await Pond.findOneAndUpdate(
      { _id: pondId },
      { seed: seed._id },
      { new: true }
    ).populate({ path: "seed", populate: { path: "hatchery" } });

    res.send(pond);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
