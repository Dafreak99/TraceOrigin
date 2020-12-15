import Farm from "../../../models/Farm";
import Worker from "../../../models/Worker";
import dbConnect from "../../../lib/dbConnect";

import jwt from "jsonwebtoken";

dbConnect();

// @route /api/worker/:id

export default async (req, res) => {
  const token = req.headers.authorization;

  const {
    query: { id },
  } = req;
  const { method } = req;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  switch (method) {
    case "GET":
      let worker = await Worker.findById(id);
      res.send(worker);
      break;
    case "POST":
      try {
        await Worker.findOneAndUpdate({ _id: id }, req.body);
        res.send({ message: "OK" });
      } catch (error) {
        res.send({ message: error.message });
      }
      break;
    case "DELETE":
      try {
        await Worker.findOneAndRemove({ _id: id });
        res.send({ message: "OK" });
      } catch (error) {
        res.send({ message: error.message });
      }

      break;
    default:
      break;
  }
};
