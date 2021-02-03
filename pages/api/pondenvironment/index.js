import dbConnect from "../../../lib/dbConnect";
dbConnect();

import PondEnvironment from "../../../models/PondEnvironment";
import Farm from "../../../models/Farm";

import jwt from "jsonwebtoken";

// @route /api/pondenvironment

export default async (req, res) => {
  const { method } = req;
  const token = req.headers.authorization;

  // if (!token)
  //   return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const farm = await Farm.findOne({ themVaoBoi: decoded });

  switch (method) {
    case "GET":
      break;
    case "POST":
      try {
        let pondEnv = new PondEnvironment({ ...req.body, farmId: farm._id });

        await pondEnv.save();
        res.send(pondEnv);
      } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
      }
      break;
    default:
      break;
  }
};
