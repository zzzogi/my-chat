const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "my-chat.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 9000,
  },
};
