// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getAllProducts } from "../../lib/db-admin";

export default async (req, res) => {
  let products = await getAllProducts();

  res.json({ products });
};
