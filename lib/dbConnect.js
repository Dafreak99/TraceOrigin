import mongose from "mongoose";

const dbConnect = async () => {
  let db = await mongose.connect(
    "mongodb+srv://haitran99:programmer2211@cluster0.xpopo.mongodb.net/traceorgin?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  );

  console.log("Mongodb Connected");
};

export default dbConnect;
