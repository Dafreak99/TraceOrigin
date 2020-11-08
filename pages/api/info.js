import dbConnect from "../../lib/dbConnect";

dbConnect();

import FeedingDiary from "../../models/FeedingDiary";

export default async (req, res) => {
  let feedingDiaries = await FeedingDiary.find({
    coSoNuoi: "5f870ac2e3711e0aecacdbae",
  }).populate(["ao", "thucAn", "coSoNuoi"]);

  res.send(feedingDiaries);
};
