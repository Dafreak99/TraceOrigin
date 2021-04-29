import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import dbConnect from "@/lib/dbConnect";
import User from "../../../models/User";

dbConnect();

// @route /api/user/signin

export default async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const { username, password } = req.body;

    try {
      let user = await User.findOne({ username });

      if (!user)
        return res
          .status(400)
          .send({ message: "Thông tin đăng nhập không hợp lệ !" });

      let match = await bcrypt.compare(password, user.password);

      if (!match)
        return res
          .status(400)
          .send({ message: "Thông tin đăng nhập không hợp lệ !" });

      let token = jwt.sign(user.id, process.env.SECRET_KEY);

      res.send({ user, token });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Error");
    }
  }
};
