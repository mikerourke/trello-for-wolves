module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint-config-airbnb-base',
    'plugin:flowtype/recommended',
  ],
  plugins: [
    'import',
    'flowtype',
  ],
  settings: {
    ecmascript: 6
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      arrowFunctions: true,
      binaryLiterals: true,
      blockBindings: true,
      classes: true,
      defaultParams: true,
      destructuring: true,
      forOf: true,
      modules: true,
      objectLiteralComputedProperties: true,
      objectLiteralDuplicateProperties: true,
      objectLiteralShorthandMethods: true,
      objectLiteralShorthandProperties: true,
      octalLiterals: true,
      regexUFlag: true,
      regexYFlag: true,
      spread: true,
      superInFunctions: true,
      templateStrings: true,
      unicodeCodePointEscapes: true,
      globalReturn: true
    }
  },
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  rules: {
    'max-len': ['error', 100, 2, {
      ignoreComments: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreTrailingComments: true,
      ignoreUrls: true,
    }],
    'class-methods-use-this': 'off',
    'flowtype/define-flow-type': 'warn',
    'flowtype/use-flow-type': 'warn',
  }
};
