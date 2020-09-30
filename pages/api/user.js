import dbConnect from "../../lib/dbConnect";

import User from "../../models/User";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const { uid } = JSON.parse(req.body);

    try {
      let user = await User.findOne({ uid });

      if (user) {
        return res.send();
      }

      user = new User(JSON.parse(req.body));

      await user.save();

      res.send();
    } catch (error) {
      console.log(error);
    }
  }
};
