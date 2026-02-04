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
    popup: "./src/popup.tsx",
    ...entries,
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "package"),
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]',
        },
      },
      {
        test: /\.css$/i,
        use: ['css-loader'],
      },
    ],
  },
};
