import dbConnect from "../../lib/dbConnect";

dbConnect();

import FeedingDiary from "../../models/FeedingDiary";

export default async (req, res) => {
  let products = await FeedingDiary.find().populate([
    "ao",
    "thucAn",
    "coSoNuoi",
  ]);

  res.send(products);
};
