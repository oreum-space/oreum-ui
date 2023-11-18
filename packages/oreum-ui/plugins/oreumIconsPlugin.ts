import { mkdir, writeFile, readdir, readFile, rm } from 'node:fs/promises'

const workingDirectory = process.cwd()

const SVG_BASE = '<svg xmlns="http://www.w3.org/2000/svg">\n$icons\n</svg>\n'
const SVG_ICON_BASE = '  <symbol id="$id">\n$icon\n  </symbol>'
const SVG_TAG_REGEX = /<svg(\w| |"|=)*xmlns="http:\/\/www\.w3\.org\/2000\/svg">/gm

export default function oreumIconsPlugin () {
  return {
    name: 'oreum-icons',
    async buildStart (error: Error): Promise<void> {
      if (error) return
      const assetsDirectory = workingDirectory + '/public'
      const iconsFile = assetsDirectory + '/icons.svg'
      const iconsSourceDirectory = workingDirectory + '/src/assets/icons'
      const iconsSourceFiles = await readdir(iconsSourceDirectory)
      const icons: Array<string> = []

      for (const iconsSourceFilename of iconsSourceFiles) {
        const iconsSourceFile = `${iconsSourceDirectory}/${iconsSourceFilename}`
        const id = iconsSourceFilename.replace(/(icon=|\.svg)/gm, '')
        const contentBuffer = await readFile(iconsSourceFile)
        const content = contentBuffer.toString()
        const icon = SVG_ICON_BASE
          .replace('$icon', '    ' + content
            .replace(SVG_TAG_REGEX, '')
            .replace(/ fill="(#FFFFFF|white)"/gm, '')
            .replace('</svg>', '')
            .split('\n')
            .map(_ => _.trim())
            .join('\n    ')
            .trim())
          .replace('$id', id)

        icons.push(icon)
      }

      const workingDirectoryList = await readdir(workingDirectory)

      if (workingDirectoryList.includes('public')) {
        await rm(assetsDirectory, { recursive: true })
      }

      await mkdir(assetsDirectory, { recursive: true })
      await writeFile(iconsFile, SVG_BASE.replace('$icons', icons.join('\n')), { encoding: 'utf8' })
      process.stdout.write('dist/assets/icons.svg\n')
    }
  }
}
