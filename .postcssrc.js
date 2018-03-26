// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    'precss': {},
    'postcss-cssnext': {
      'browsers': [
        'last 2 versions',
        'Android >= 4',
        'iOS >= 8',
        'Firefox >= 20',
        'ie 6-11'
      ]
    }
  }
}
