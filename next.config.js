const withSourceMaps = require("@zeit/next-source-maps")({
  devtool: "hidden-source-map",
});

let config = withSourceMaps;

config.images = { domains: ["res.cloudinary.com"] };

module.exports = config;
