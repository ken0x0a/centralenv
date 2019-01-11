import path from 'path'
import { appDir } from './utils'
import { Resolve } from 'webpack'

export const resolve: Resolve = {
  symlinks: true,
  cacheWithContext: false,
  mainFields: ['main', 'module'],
  extensions: ['.tsx', '.ts', '.js', '.json'],
  alias: {
    src: path.resolve(appDir, 'src'),
  },
}
