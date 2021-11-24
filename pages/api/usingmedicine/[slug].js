import UsingMedicine from "@/models/UsingMedicine";
import Farm from "@/models/Farm";
import dbConnect from "@/lib/dbConnect";
import jwt from "jsonwebtoken";

dbConnect();

// @route /api/medicine/[slug]
// @desc Get detail information of your farm

export default async (req, res) => {
  const token = req.headers.authorization;

  const { method } = req;
  const {
    query: { id },
  } = req;

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let farm = await Farm.findOne({ createdBy: decoded });

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  switch (method) {
    case "GET":
      const { slug } = req.query;

      const [state, pondId] = slug.split("||");

      try {
        let usingMedicineDiaries;
        if (pondId !== "*") {
          usingMedicineDiaries = await UsingMedicine.find({
            farm: farm._id,
            isDone: state === "false",
            pond: pondId,
          }).populate(["pond", "food", "farm", "medicine", "worker"]);
        } else {
          usingMedicineDiaries = await UsingMedicine.find({
            farm: farm._id,
            isDone: state === "false",
          }).populate(["pond", "food", "farm", "medicine", "worker"]);
        }

        res.send(usingMedicineDiaries);
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
      }
      break;
    case "POST":
      // Update a specific medicine
      try {
        await Medicine.findOneAndUpdate({ _id: req.body._id }, req.body);
        res.send({ message: "OK" });
      } catch (error) {
        res.send({ message: error.message });
      }
      break;
    case "DELETE":
      try {
        await Medicine.findOneAndRemove({ _id: id });
        res.send({ message: "OK" });
      } catch (error) {
        res.send({ message: error.message });
      }
      break;
    default:
      break;
  }
};
