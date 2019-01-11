import * as path from 'path'
import * as fs from 'fs'
import fse from 'fs-extra'
import pkgJson from '../package.json'
import { execSync } from 'child_process'

const appDir = path.resolve(__dirname, '..')
const OUTPUT_DIR = path.resolve(appDir, '.tmp')
const COPY_PATH_NAME = ['./lib', './bin', './README.md', './LICENSE.md']

const OUT_FILE_PATH = path.resolve(OUTPUT_DIR, 'package.json')

const encoding = 'utf8'

const packageJson = {
  private: false,
  ...(({ devDependencies, private: pr, scripts, ...pkg }: typeof pkgJson) => pkg)(
    pkgJson,
  ),
}

function createOutPutDirIfNotExist() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR)
}
function copyPaths() {
  COPY_PATH_NAME.forEach((pathname) => {
    const orig = path.resolve(appDir, pathname)
    const dest = path.resolve(OUTPUT_DIR, pathname)
    fse.copySync(orig, dest)
  })
}
function createPackageJson() {
  const data = JSON.stringify(packageJson, null, 2)
  fs.writeFileSync(OUT_FILE_PATH, data, {
    encoding,
  })
}
// function publishToNPM() {
//   execSync(`cd ${OUTPUT_DIR} && npm publish`)
// }
function main() {
  createOutPutDirIfNotExist()
  copyPaths()
  createPackageJson()
  // publishToNPM()
}
main()
