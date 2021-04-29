import dbConnect from "@/lib/dbConnect";
dbConnect();

import jwt from "jsonwebtoken";

import Seed from "models/Seed";
import Post from "models/Post";

// @route /api/product/:id

export default async (req, res) => {
  const { method } = req;

  const {
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      const post = await Post.findById(id);

      res.send(post);

      break;
    case "POST":
      break;
    case "PUT":
      break;

    default:
      break;
  }
};
