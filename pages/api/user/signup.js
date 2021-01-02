import dbConnect from "../../../lib/dbConnect";

import User from "../../../models/User";

dbConnect();

// @route /api/user/signup

export default async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const { username } = req.body;

    let existedUser = await User.findOne({ username });

    if (existedUser) {
      return res.send({
        message: "Tên tài khoản đã có người đăng ký. Vui lòng thử lại",
      });
    }

    try {
      let user = new User(req.body);
      await user.save();

      res.send(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: "Lỗi hệ thống" });
    }
  }
};
