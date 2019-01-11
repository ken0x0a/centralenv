module.exports = function(api) {
  api.cache(false)
  return {
    overrides: [
      {
        test: '../../',
        extends: '../../babel.config.js',
      },
    ],
    env: {
      production: {
        plugins: [['transform-remove-console', { exclude: ['error', 'warn', 'log'] }]],
      },
    },
  }
}
