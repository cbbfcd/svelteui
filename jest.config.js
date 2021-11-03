module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.svelte$': ['svelte-jester', { preprocess: true }]
  },
  transformIgnorePatterns: ['node_modules/(?!(svelteui-icons|lodash-es)/)'],
  moduleFileExtensions: ['js', 'svelte'],
  bail: false,
  verbose: false,
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect']
};
