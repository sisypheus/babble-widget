const path = require('path');
const webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  const isDevBuild = env?.prod ? false : true;
  const bundleOutputDir = isDevBuild ? './dist' : './build';

  return [{
    entry: './src/index.js',
    output: {
      filename: 'widget.js',
      path: path.resolve(bundleOutputDir),
    },
    devServer: {
      static: {
        directory: path.join(__dirname, bundleOutputDir)
      },
      port: 9000,
    },
    plugins: isDevBuild
      ? [new webpack.SourceMapDevToolPlugin(), new copyWebpackPlugin({ patterns: [{ from: 'dev/' }] })]
      : [],
    optimization: {
      minimize: !isDevBuild,
    },
    mode: isDevBuild ? 'development' : 'production',
    module: {
      rules: [
        // packs SVG's discovered in url() into bundle
        { test: /\.svg/, use: 'svg-url-loader' },
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, 'src'),
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', {
                    'targets': {
                      'browsers': ['IE 11, last 2 versions']
                    },
                    corejs: 3,
                    useBuiltIns: 'usage',
                  }],
                  [
                    '@babel/typescript',
                    { jsxPragma: "h" }
                  ],
                ],
                'plugins': [
                  // syntax sugar found in React components
                  '@babel/proposal-class-properties',
                  '@babel/proposal-object-rest-spread',
                  // transpile JSX/TSX to JS
                  ['@babel/plugin-transform-react-jsx', {
                    // we use Preact, which has `Preact.h` instead of `React.createElement`
                    pragma: 'h',
                    pragmaFrag: 'Fragment'
                  }]
                ]
              }
            }
          ]
        }]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }
  }];
};