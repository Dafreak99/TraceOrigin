import Pond from "../../../models/Pond";
import dbConnect from "../../../lib/dbConnect";
import Seed from "../../../models/Seed";

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

    const seed = new Seed({ ...req.body, isDone: false });

    await seed.save();

    const pond = await Pond.findOneAndUpdate(
      { _id: pondId },
      { seed: seed._id, stockingDensity: "400" },
      { new: true }
    );

    res.send(pond);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
