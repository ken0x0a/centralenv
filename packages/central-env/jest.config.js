module.exports = {
  // ...safeConfig(tsjPreset),
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    // ...tsjPreset.transform,
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'babel-jest',
    // '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'node',
  transformIgnorePatterns: ['node_modules/(?!(babel-jest)/)'],
  testRegex: '\\.(test|spec)\\.(ts|tsx|js)$',
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/e2e/', '<rootDir>/node_modules/'],
  globals: {
    'ts-jest': {
      // useBabelrc: true,
      // babelConfig,
      tsConfig: 'tsconfig.json',
    },
  },
  cacheDirectory: '.jest/cache',
  // setupTestFrameworkScriptFile: '',
  setupFiles: ['<rootDir>/jest.setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  // globalSetup: '<rootDir>/jest.before.js',
  // globalTeardown: './jest.after.ts'
}
