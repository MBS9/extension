const path = require("path");
const utils = require("./src/options");

const options = utils.optionsKeys;

const entries = {};
for (const option of options) {
  entries[option] = `./src/${option}.ts`;
}

module.exports = {
  entry: {
    background: "./src/background.ts",
    popup: "./src/popup.ts",
    ...entries,
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
