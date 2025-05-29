declare module 'imagemin-gifsicle' {
  import { Plugin } from 'imagemin'

  interface Options {
    interlaced?: boolean
    optimizationLevel?: number
    colors?: number
  }

  // eslint-disable-next-line no-unused-vars
  const plugin: (options?: Options) => Plugin
  export default plugin
}

declare module 'imagemin-mozjpeg' {
  import { Plugin } from 'imagemin'

  interface Options {
    quality?: number
    progressive?: boolean
    arithmetic?: boolean
    smooth?: number
  }
  // eslint-disable-next-line no-unused-vars
  const plugin: (options?: Options) => Plugin
  export default plugin
}

declare module 'imagemin-pngquant' {
  import { Plugin } from 'imagemin'

  interface Options {
    quality?: [number, number]
    speed?: number
  }
  // eslint-disable-next-line no-unused-vars
  const plugin: (options?: Options) => Plugin
  export default plugin
}

declare module 'imagemin-svgo' {
  import { Plugin } from 'imagemin'

  interface Options {
    plugins?: any[]
  }
  // eslint-disable-next-line no-unused-vars
  const plugin: (options?: Options) => Plugin
  export default plugin
}

declare module 'imagemin-webp' {
  import { Plugin } from 'imagemin'

  interface Options {
    quality?: number
  }
  // eslint-disable-next-line no-unused-vars
  const plugin: (options?: Options) => Plugin
  export default plugin
}
