import dbConnect from "../../lib/dbConnect";
import FeedingDiary from "../../models/FeedingDiary";

dbConnect();

export default async (req, res) => {
  // id = 5f77e95f5178f607a87d892f
  // const farm = await Farm.findOne({
  //   themVaoBoi: "5f77e95f5178f607a87d892f",
  // });

  // const ponds = await Pond.find({ farmId: farm._id }).populate("seed");
  // Populate by the name field not the model

  let feedingDiaries = await FeedingDiary.find({
    _id: "5f9424ad4959fa23c00d7833",
  }).populate("ao");

  res.send(feedingDiaries);
};
