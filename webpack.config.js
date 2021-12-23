const path = require("path");

module.exports = {
  entry: "./src/js/index.js",
  target: ["web", "es5"],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
  watch: true,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
