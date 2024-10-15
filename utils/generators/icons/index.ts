import type { Stats } from 'node:fs'
import { readdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'path'

const VALID_ICON_FILENAME = /icon=(\w|-)+.svg/

const {
  writeLine,
  clearLine
} = (function () {
  let length = 0

  function _writeLine (message: string) {
    process.stdout.write(message)
    length = message.length
  }

  function _clearLine () {
    process.stdout.write('\r' + ''.padEnd(length, ' ') + '\r')
  }

  return {
    writeLine: _writeLine,
    clearLine: _clearLine
  }
})()

async function getOutputFileStats (outputFile: string): Promise<Stats> {
  try {
    return await stat(outputFile)
  } catch (error: unknown) {
    if (!(error instanceof Error) || !('code' in error) || error.code !== 'ENOENT') {
      throw new Error(`${ error?.message ?? 'Unknown error' } while reading stats of "${ outputFile }"`)
    }
  }
}

async function iconsAlreadyGenerated (inputFolder: string, filenames: Array<string>, outputFileStats: Stats) {
  for (const filename of filenames) {
    const filepath = path.join(inputFolder, filename)
    try {
      if ((await stat(filepath)).mtimeMs <= outputFileStats.mtimeMs) return true
    } catch (error) {
      if (error instanceof Error && 'code' && error.code === 'ENOENT') continue
      throw new Error(`${ error?.message ?? 'Unknown error' } while reading stats of ${ filepath }`)
    }
  }

  return false
}

async function generateOutputFile (inputFolder: string, filenames: Array<string>, outputFile: string) {
  const content = []

  for (const filename of filenames) {
    writeLine(`Reading "${ filename }".`)
    content.push(
      `  <symbol id="${ filename.replace(/(icon=|\.svg)/gm, '') }">\n    ${
        (await readFile(path.join(inputFolder, filename)))
          .toString()
          .replace(/<svg(\w| |"|=)*xmlns="http:\/\/www\.w3\.org\/2000\/svg">/gm, '')
          .replace(/ fill="(#FFFFFF|white|D9D9D9)"/gm, '')
          .replace('</svg>', '')
          .split('\n').join('\n    ')
          .trim()
      }\n  </symbol>`
    )
    clearLine()
  }

  writeLine(`Writing "${ path.basename(outputFile) }".`)
  await writeFile(outputFile, `<svg xmlns="http://www.w3.org/2000/svg">\n${
    content.join('\n')
  }\n</svg>\n`, { encoding: 'utf-8' })
  clearLine()
  console.log(filenames.length, 'icons generated!')
}

async function generateTypes (filenames: Array<string>, outputTypes: string) {
  const iconNames = filenames.map(filename => filename.replace(/(icon=|\.svg)/gm, ''))

  writeLine(`Writing "${ path.basename(outputTypes) }".`)
  await writeFile(outputTypes, `const icons = [\n  ${
    iconNames.map(iconName => `'${ iconName }'`).join(',\n  ')
  }\n] as const\n\nexport enum OIconNames {\n  ${
    iconNames.map(iconName => `${ iconName.replace(/-[a-z]/, (r: string) => r.at(-1).toUpperCase()) } = '${ iconName }'`).join(',\n  ')
  }\n}\n\nexport type OIconName = (typeof icons)[number]\n\nexport default icons\n`, { encoding: 'utf-8' })
  clearLine()
  console.log('Types generated!')
}

async function generateIcons (inputFolder: string, outputFile: string, outputTypes: string) {
  const outputFileStats = await getOutputFileStats(outputFile)

  const filenames = (await readdir(inputFolder)).filter(RegExp.prototype.test.bind(VALID_ICON_FILENAME))
  writeLine(`${ filenames.length } icons found!`)

  if (!filenames.length) return console.log('Icons was not found. Input Folder is empty.')

  const alreadyGenerated = !!outputFileStats && await iconsAlreadyGenerated(inputFolder, filenames, outputFileStats)

  clearLine()
  if (alreadyGenerated) {
    return console.log(filenames.length, 'icons have already been generated.')
  }

  await generateOutputFile(inputFolder, filenames, outputFile)
  await generateTypes(filenames, outputTypes)
}

try {
  await generateIcons(
    './utils/generators/icons/assets',
    './src/lib/generated/assets/icons.svg',
    './src/lib/generated/types/icons.ts'
  )
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(error.message)
  }
}
