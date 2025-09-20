declare module 'instafeed.js' {
  interface InstafeedOptions {
    accessToken: string
    limit?: number
    template?: string
    target?: HTMLElement | string
    after?: () => void
    error?: (message: string) => void
  }

  class Instafeed {
    constructor(options: InstafeedOptions)
    run(): void
  }

  export default Instafeed
}