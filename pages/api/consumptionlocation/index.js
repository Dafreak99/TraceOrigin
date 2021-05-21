import dbConnect from "@/lib/dbConnect";

import jwt from "jsonwebtoken";
import ConsumptionLocation from "models/ConsumptionLocation";

dbConnect();

// @route /api/consumptionlocation

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let consumption = await ConsumptionLocation.findOne({ createdBy: decoded });

  switch (method) {
    case "GET":
      if (!consumption) {
        return res.send({ message: "Require setup" });
      }

      res.send(consumption);

      break;

    case "POST":
      try {
        const consumptionLocation = new ConsumptionLocation({
          ...req.body,
          createdBy: decoded,
        });
        await consumptionLocation.save();

        console.log(consumptionLocation);

        res.send(consumptionLocation);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
      break;

    default:
      break;
  }
};
