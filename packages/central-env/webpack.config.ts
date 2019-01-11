import 'tsconfig-paths/register'
import webpack from 'webpack'
import path from 'path'
import fs from 'fs'
import c from 'chalk'
import {
  typescriptLoaderConfiguration,
  babelLoaderConfiguration,
  sourceMapLoaderConfiguration,
} from './webpack/loaders'
import { resolve } from './webpack/resolve'

import nodeExternals from 'webpack-node-externals'

const mode: webpack.Configuration['mode'] = 'production'
const appDir = path.resolve(__dirname, './')

// const { NormalModuleReplacementPlugin, IgnorePlugin } = webpack
const config: webpack.Configuration = {
  // https://webpack.js.org/concepts/mode/
  mode,
  devtool: 'source-map',
  // devtool: isDev ? 'inline-source-map' : 'source-map',
  // your web-specific entry file
  entry: path.resolve(appDir, 'src/index.ts'),

  // https://webpack.js.org/configuration/output/
  output: {
    filename: 'index.js',
    // == publicPath =>  https://stackoverflow.com/a/38748466/5795303
    // publicPath: '/assets/',
    path: path.resolve(appDir, './lib'),
  },

  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  node: {},

  // https://webpack.js.org/configuration/externals/#externals
  externals: [
    // https://github.com/liady/webpack-node-externals
    // nodeExternals(),
    {
      yargs: 'commonjs yargs',
      chalk: 'commonjs chalk',
    },
    // 'yargs',
    // 'chalk',
    // { whitelist: ['yargs', 'chalk'] }
  ],

  // watch: true,
  watchOptions: {
    aggregateTimeout: 1000,
    // poll: 1000,
    ignored: [/node_modules/, /build/, /bin/],
  },

  module: {
    rules: [
      babelLoaderConfiguration,
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      typescriptLoaderConfiguration,
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      sourceMapLoaderConfiguration,
    ],
  },

  plugins: [],
  // optimization: {
  //   minimize: false,
  // },

  resolve,
}

export default config
