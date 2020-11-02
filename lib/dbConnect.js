import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(
    "mongodb+srv://haitran99:programmer2211@cluster0.xpopo.mongodb.net/traceorgin?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
