/* global NODE_ENV */

export default {
  hoodieUrl: {
    development: `${window.location.protocol}//${window.location.hostname}:2048`,
    production: `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
  }[NODE_ENV]
}
