const path = require("path");

module.exports = {
  entry: {
    background: "./src/background.ts",
    popup: "./src/popup.ts",
    set_style: "./src/set_style.ts",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "package"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
