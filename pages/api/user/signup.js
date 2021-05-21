import dbConnect from "@/lib/dbConnect";

import User from "../../../models/User";

dbConnect();

// @route /api/user/signup

export default async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const { username } = req.body;

    let existedUser = await User.findOne({ username });

    if (existedUser) {
      return res.status(400).send({
        message: "Tên tài khoản đã có người đăng ký !",
      });
    }

    try {
      let user = new User({ ...req.body, type: "consumption" });
      await user.save();

      res.send(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: "Lỗi hệ thống" });
    }
  }
};
