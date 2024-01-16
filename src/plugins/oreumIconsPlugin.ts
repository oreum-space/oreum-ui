import { Plugin } from 'vue'

export const oreumIconsInjectionKey = Symbol('oreumIconsInjectionKey')

export type OreumPluginOptions = {
  oreumIcons?: string
}

export default <Plugin<OreumPluginOptions>>{
  install (app, options) {
    const { oreumIcons } = options

    if (oreumIcons) {
      app.provide(oreumIconsInjectionKey, oreumIcons)
    }
  }
}