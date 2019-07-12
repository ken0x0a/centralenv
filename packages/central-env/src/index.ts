import * as path from 'path'
import * as fs from 'fs'
import * as os from 'os'
import chalk from 'chalk'
import * as yargs from 'yargs'

//
// Types
//

type EnvValue = string
interface EnvKeyValueMap {
  [EnvKey: string]: EnvValue
}
type Stages = string

//
// Constants
//
const appDir = process.cwd()
const homeDir = os.homedir()

const args = yargs
  .version(false)
  .pkgConf('central-env')
  .env('CENTRALENV')
  .help()
  .default({
    keySourceFile: '.env.example',
    sourceFile: '.env',
    stages: ['development', 'production', 'test'],
    sourceDir: `${homeDir}/.env`,
    // stageLess: false,
  })
  // .boolean('stageLess')
  // .alias('l', 'stageLess')
  .string('projectName')
  .alias('p', 'projectName')
  .alias('h', 'help')
  .alias('k', 'keySourceFile')
  .alias('d', 'sourceDir')
  .coerce('stages', (stages) => (stages === true ? '' : stages))
  .alias('s', 'stages')
  .describe('projectName', '.env.<projectName>.<stage>').argv
console.debug({ args })

const projectName = args.projectName ? `.${args.projectName}` : ''
console.debug('project dir is "%s"', appDir)

const keySourceFilePath = path.resolve(appDir, args.keySourceFile)

const stages = Array.isArray(args.stages) ? args.stages : [args.stages]
const outputPaths: { [stage: string]: string } = {}
stages.forEach((stage) => {
  const absPath = path.resolve(appDir, stage ? `.env.${stage}` : '.env')
  console.debug({ stage, absPath })
  // const absPath = path.resolve(appDir, ['.env', stage].join('.'))
  outputPaths[stage] = absPath
})

//
// Function
//

function isFileExist(path: string): void {
  if (!fs.existsSync(path)) {
    console.error(chalk.magentaBright("%s doesn't exist!"), path)
    process.exit(2)
  }
}
function preCheck(): void {
  isFileExist(keySourceFilePath)
  // isFileExist(sourceFile)
}

function readEnvFile(): string[] {
  const lines = fs.readFileSync(keySourceFilePath, { encoding: 'utf8' }).split('\n')
  return lines
}

function readSource(stage: Stages): { [EnvKey: string]: string } {
  const sourceFilename = '.env'
  const stagePostfix = stage ? `.${stage}` : ''
  const sourceFile = path.resolve(
    args.sourceDir,
    `${sourceFilename}${projectName}${stagePostfix}`,
  )
  isFileExist(sourceFile)

  const lines = fs.readFileSync(sourceFile, { encoding: 'utf8' }).split('\n')
  const envKeyValueMap: EnvKeyValueMap = {}
  lines
    .filter((line) => !line.match(/^#/) && !line.match(/^[ \t]*$/))
    .forEach((line) => {
      // split line to [key & value]
      const index = line.indexOf('=')
      const key = line.slice(0, index)
      const value = line.slice(index + 1)
      console.debug({ line, key, value })

      envKeyValueMap[key] = value
    })
  return envKeyValueMap
}

/**
 * ## Supported lines example (with "=" | without "=")
 *
 * - SOME_KEY
 * - SOME_KEY=SOME_VALUE
 */
function getEnvKeyFromLine(line: string) {
  return line.indexOf('=') ? line.split('=', 1)[0] : line.trim()
}
function copyRootEnvByKeys(envKeyValueMap: EnvKeyValueMap, lines: string[]): string[] {
  const res = lines.map((line) => {
    // return comment line without change, to keep format
    if (line.match(/^#/)) return line
    if (line.match(/^[ \t]*$/)) return line

    const key = getEnvKeyFromLine(line)
    const value = envKeyValueMap[key] || ''
    console.debug({ key, value })
    return `${key}=${value}`
  })
  // console.debug()

  return res
}

function writeOutput(path: string, data: string): void {
  fs.writeFile(path, data, { encoding: 'utf8', flag: 'w' }, (err) => {
    if (err) console.error(err)
    console.log(chalk.cyanBright('"%s" created'), path)
  })
}

function main() {
  preCheck()
  const lines = readEnvFile()

  stages.forEach((stage) => {
    const path = outputPaths[stage]
    const envKeyValueMap = readSource(stage)
    console.debug({ envKeyValueMap })
    const copied = copyRootEnvByKeys(envKeyValueMap, lines)
    const data = copied.join('\n')
    writeOutput(path, data)
  })
}

main()
