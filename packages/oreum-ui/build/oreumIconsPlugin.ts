import { Stats } from 'fs'
import { Plugin } from 'vite'
import {
  stat,
  readdir,
  readFile,
  writeFile
} from 'fs/promises'

interface OreumIconsPluginOptions {
  sourceFolder: string,
  outputFile: string
}

const OREUM_PREFIX = '\x1b[38;2;255;202;79moreum icons\x1b[0m'
const ERROR_PREFIX = OREUM_PREFIX + ' \x1b[31merror\x1b[0m: '
const OREUM_ICON_REGEX = /icon=(\w|_)+.svg/
const SVG_BASE = '<svg xmlns="http://www.w3.org/2000/svg">\n$icons\n</svg>\n'
const SVG_ICON_BASE = '  <symbol id="$id">\n$icon\n  </symbol>'
const SVG_TAG_REGEX = /<svg(\w| |"|=)*xmlns="http:\/\/www\.w3\.org\/2000\/svg">/gm

function write (message: string, newLine = false): void {
  if (!newLine) {
    process.stdout.clearLine(0)
    process.stdout.cursorTo(0)
  }
  process.stdout.write(message)
}

function throwError (message: string): never {
  throw new Error(message)
}

async function validateSourceFolder (sourceFolder: string): Promise<void> {
  if (!sourceFolder) throwError('sourceFolder not specified!')
  if (typeof sourceFolder !== 'string') throwError('sourceFolder not string!')
  let sourceFolderStat: Stats
  try {
    sourceFolderStat = await stat(sourceFolder)
  } catch {
    throwError('failed to read sourceFolder!')
  }
  if (!sourceFolderStat.isDirectory()) throwError('sourceFolder is not folder!')
}

async function validateOutputFile (outputFile: string): Promise<void> {
  if (!outputFile) throwError('outputFile not specified!')
  if (typeof outputFile !== 'string') throwError('outputFile not string!')
}

async function validateOptions (options: OreumIconsPluginOptions): Promise<void> {
  process.stdout.write(OREUM_PREFIX + ': validation options')
  if (!options) throwError('options not specified!')
  await Promise.all([
    validateSourceFolder(options.sourceFolder),
    validateOutputFile(options.outputFile)
  ])
}

async function findNewerIcon (iconFiles: string[], outputFileMTimeMs: number) {
  for (const iconFile of iconFiles) {
    try {
      if ((await stat(iconFile)).mtimeMs > outputFileMTimeMs) {
        return true
      }
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        continue
      }
      throwError((error?.message || 'unknown error') + ' while reading: ' + iconFile)
    }
  }
  return false
}

async function generateIcons (options: OreumIconsPluginOptions): Promise<void> {
  let outputFileStat: Stats

  try {
    outputFileStat = await stat(options.outputFile)
  } catch (error) {
    if (
      !(error instanceof Error) ||
      !('code' in error) ||
      error.code !== 'ENOENT'
    ) throwError(error?.message || 'unknown error while reading: ' + options.outputFile)
  }

  const folderPath = /[/\\]$/.test(options.sourceFolder) ? options.sourceFolder : options.sourceFolder + '/'
  const iconFilenames = (await readdir(options.sourceFolder))
    .filter((file) => OREUM_ICON_REGEX.test(file))
  write(OREUM_PREFIX + ': ' + iconFilenames.length + ' icons found')
  const iconFiles = iconFilenames.map((iconFile) => folderPath + iconFile)

  if (outputFileStat && !(await findNewerIcon(iconFiles, outputFileStat.mtimeMs))) {
    return write(OREUM_PREFIX + ': ' + options.outputFile.split(/([/\\])/).at(-1) + ' is already up to date.')
  }

  const content = []
  const lastIndex = iconFiles.length - 2

  for (let index = 0; index <= lastIndex; index++) {
    const filename = iconFilenames[index]
    write(OREUM_PREFIX + ': reading ' + filename)
    content.push(
      SVG_ICON_BASE
        .replace(
          '$icon', '    ' + (await readFile(iconFiles[index])).toString()
            .replace(SVG_TAG_REGEX, '')
            .replace(/ fill="(#FFFFFF|white)"/gm, '')
            .replace('</svg>', '')
            .split('\n')
            .map(_ => _.trim())
            .join('\n    ')
            .trim()
        )
        .replace('$id', filename.replace(/(icon=|\.svg)/gm, ''))
    )
  }

  write(OREUM_PREFIX + ': writing ' + options.outputFile.split(/([/\\])/).at(-1))
  await writeFile(options.outputFile, SVG_BASE.replace('$icons', content.join('\n')), { encoding: 'utf8' })
  write(`\x1b[32m✓\x1b[0m ${ iconFilenames.length } ${ OREUM_PREFIX } generated!`)
}

export default function oreumIconsPlugin (options: OreumIconsPluginOptions): Plugin {
  return {
    name: 'oreum-icons',
    async buildStart () {
      try {
        await validateOptions(options)
        await generateIcons(options)
        process.stdout.write('\n')
      } catch (error: Error | unknown) {
        if (error instanceof Error) write(ERROR_PREFIX + error.message + '\n')
      }
    }
  }
}
