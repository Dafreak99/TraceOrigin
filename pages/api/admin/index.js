import User from "../../../models/User";
import dbConnect from "../../../lib/dbConnect";

import jwt from "jsonwebtoken";

dbConnect();

// @route /api/admin

export default async (req, res) => {
  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let user = await User.findById(decoded);

  if (user.type !== "admin")
    res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const { method } = req;

  switch (method) {
    case "GET":
      let users = await User.find({ _id: { $ne: decoded } });
      // $ne means Not Equal
      res.send(users);
      break;
    case "POST":
      try {
        const user = new User(req.body);
        await user.save();

        res.send(user);
      } catch (error) {
        res.end({ message: error.message });
      }
    case "DELETE":
      try {
        await User.findByIdAndRemove(req.body.id);
        res.send({ message: "OK" });
      } catch (error) {
        console.log(error.message);
      }

    default:
      break;
  }
};
