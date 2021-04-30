const mongoose = require("mongoose");
const Farm = require("./Farm");
const FeedingDiary = require("./FeedingDiary");
const HarvestProduct = require("./HarvestProduct");
const Note = require("./Note");
const Packing = require("./Packing");
const Pond = require("./Pond");
const PondEnvironment = require("./PondEnvironment");
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
    },
    harvestProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: HarvestProduct,
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
  dailyNote: [
    { type: mongoose.Schema.Types.ObjectId, ref: Note, default: null },
  ],
  pondEnvironment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: PondEnvironment,
      default: null,
    },
  ],
  seed: { type: mongoose.Schema.Types.ObjectId, ref: Seed, default: null },
  qrCode: { type: String, default: null },
});

module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
