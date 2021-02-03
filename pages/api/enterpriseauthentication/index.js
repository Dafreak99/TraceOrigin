import Farm from "../../../models/Farm";
import dbConnect from "../../../lib/dbConnect";

import EnterpriseAuthentication from "../../../models/EnterpriseAuthentication";

import jwt from "jsonwebtoken";

dbConnect();

// @route /api/enterpriseauthentication
// @desc Get detail authentication of your farm

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let farm = await Farm.findOne({ themVaoBoi: decoded });

  switch (method) {
    case "GET":
      try {
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
      break;
    case "POST":
      let authentication = new EnterpriseAuthentication(req.body);

      await authentication.save();

      await Farm.findByIdAndUpdate(farm._id, { chungThuc: authentication._id });
      res.send({ message: "OK" });

      try {
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
      break;
    default:
      break;
  }
};
