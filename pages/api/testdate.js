import dbConnect from "../../lib/dbConnect";

dbConnect();

import Date from "../../models/Date";

export default async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    let date = new Date(req.body);
    date.save();
  }
};
