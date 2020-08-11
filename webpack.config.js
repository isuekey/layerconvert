
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
  }
};
