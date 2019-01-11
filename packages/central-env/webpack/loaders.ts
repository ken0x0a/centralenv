import { Rule } from 'webpack'
import { appDir } from './utils'

import path from 'path'
const babelConfig = require('../babel.config')

export const typescriptLoaderConfiguration = {
  test: /\.tsx?$/,
  loader: 'awesome-typescript-loader',
  options: {
    errorsAsWarnings: true,
    configFileName: path.resolve(appDir, 'webpack/tsconfig.webpack.json'),
    transpileOnly: true,
    forceIsolatedModules: true,
  },
}

export const babelLoaderConfiguration = {
  test: /(\.js|\.tsx?)$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDir, 'src'),
    path.resolve(appDir, '../../modules/**/*'),
    path.resolve(appDir, '../../node_modules/@module'),
  ],
  exclude: /node_modules\/(?!(@tools|@lib))/,
  use: {
    loader: 'babel-loader',
    options: {
      babelrc: false,
      ...babelConfig,
    },
  },
}

export const sourceMapLoaderConfiguration: Rule = {
  enforce: 'pre',
  test: /\.js$/,
  loader: 'source-map-loader',
  exclude: [/node_modules/, /build/, /__test__/],
}
