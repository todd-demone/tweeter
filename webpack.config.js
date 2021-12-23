const path = require("path");

module.exports = {
  entry: "./src/js/index.js",
  target: ["web", "es5"],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
};
