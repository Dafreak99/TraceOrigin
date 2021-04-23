const mongoose = require("mongoose");
const Farm = require("./Farm");
const FeedingDiary = require("./FeedingDiary");
const Packing = require("./Packing");
const Pond = require("./Pond");
const RejectMessage = require("./RejectMessage");
const Seed = require("./Seed");
const UsingMedicine = require("./UsingMedicine");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  unit: String,
  images: [String],
  weight: String,
  harvestedDate: String,
  isRegistered: {
    status: String,
    reject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: RejectMessage,
      default: null,
    },
  },
  isHarvested: {
    status: String,
    reject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: RejectMessage,
      default: null,
    },
  },
  pond: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Pond,
    default: null,
  },
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Farm,
    default: null,
  },
  feeding: [
    { type: mongoose.Schema.Types.ObjectId, ref: FeedingDiary, default: null },
  ],
  usingMedicine: [
    { type: mongoose.Schema.Types.ObjectId, ref: UsingMedicine, default: null },
  ],
  seed: { type: mongoose.Schema.Types.ObjectId, ref: Seed, default: null },
  packingMethod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Packing,
    default: null,
  },
  qrCode: { type: String, default: null },
});

module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
