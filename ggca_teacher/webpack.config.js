const glob = require("glob");
const path = require("path");

function getEntries(pattern) {
  const entries = {};

  glob.sync(pattern).forEach((file) => {
    entries[file.replace("src/", "")] = path.join(__dirname, file);
  });

  return entries;
}

module.exports = {
  entry: getEntries("src/**/*.jsx"),
  output: {
    path: path.resolve(__dirname, "static"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
