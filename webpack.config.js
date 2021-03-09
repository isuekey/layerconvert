
const path = require('path');

module.exports = {
  mode:'production',
  entry:'./src/index.js',
  output:{
    path:path.resolve(__dirname, 'dist'),
    filename:'layerconvert.js',
    library:'layerconvert',
    libraryTarget:'umd'
  },
  externals: {
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: "ts-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
    ],
  },
};
