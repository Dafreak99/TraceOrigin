import Pond from "../../models/Pond";
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

  let feedingdiary = await FeedingDiary.find();
  // .populate("ao")
  // .populate("thucAn");

  res.send(feedingdiary);
};
