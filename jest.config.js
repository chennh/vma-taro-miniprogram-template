const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')
const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, './'),
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  globals: {
    "ts-jest": {
      compiler: "typescript",
      tsConfig: false,
      isolatedModules: false,
      diagnostics: true,
      babelConfig: false
    }
  }
}
