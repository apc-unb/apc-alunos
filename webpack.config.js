const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Remover mode: 'development' para fazer o build de procução 
module.exports = {
  entry: {
    students_main: './area_restrita/src/index.js',
    tests_main: './area_restrita/src/provas_react.jsx'
  },
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin()
  ] ,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
       },
       {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
       },
       {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  }
};