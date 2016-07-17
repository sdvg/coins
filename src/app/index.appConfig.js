export default {
  hoodieUrl: {
   development: `${location.protocol}//${location.hostname}:2048`,
    production: `${location.protocol}//${location.hostname}:${location.port}`
  }[NODE_ENV]
}
