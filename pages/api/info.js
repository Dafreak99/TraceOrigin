import dbConnect from "../../lib/dbConnect";

dbConnect();

import FeedingDiary from "../../models/FeedingDiary";

export default async (req, res) => {
  try {
    let feedingDiaries = await FeedingDiary.find({
      coSoNuoi: "5f870ac2e3711e0aecacdbae",
    }).populate(["ao", "thucAn", "coSoNuoi"]);

    res.send(feedingDiaries);
  } catch (error) {
    res.send({ message: error.message });
  }
};
