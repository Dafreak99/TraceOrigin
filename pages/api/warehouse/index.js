import dbConnect from "../../../lib/dbConnect";
dbConnect();

import jwt from "jsonwebtoken";
import Warehouse from "models/Warehouse";
import Business from "models/Business";

// @route /api/warehouse

export default async (req, res) => {
  const { method } = req;

  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let business = await Business.findOne({ themVaoBoi: decoded });

  switch (method) {
    case "GET":
      // temporary test one first
      const warehouses = await Warehouse.find({ businessId: business._id });
      res.send(warehouses);

      break;
    case "POST":
      try {
        const warehouse = new Warehouse({
          ...req.body,
          businessId: business._id,
        });
        await warehouse.save();
        res.send(warehouse);
      } catch (error) {
        res.send({ message: error.message });
      }
    case "DELETE":
      try {
        await Warehouse.findByIdAndRemove(req.body.deleteId);
        res.send({ message: "OK" });
      } catch (error) {
        res.send({ message: error.message });
      }

      break;
    default:
      break;
  }
};
