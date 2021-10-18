const withSourceMaps = require("@zeit/next-source-maps")({
  devtool: "hidden-source-map",
});

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });
let config = withSourceMaps;

config.images = { domains: ["res.cloudinary.com"] };
config.target = "serverless";

module.exports = config;

// module.exports = withBundleAnalyzer({});
