const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  watch: true,
  watchOptions: {},
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"], },
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'], },
    ]
  },
  devtool: 'inline-source-map',
  plugins: [],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public')
  }
}