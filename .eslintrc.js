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
      generators: true,
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
    'max-len': ['error', 80, 2, {
      ignoreComments: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreTrailingComments: true,
      ignoreUrls: true,
    }],
    // Since I develop on both Windows and Mac, I don't want to have to keep
    // fixing this:
    'linebreak-style': 'off',
    /*
     Airbnb Style Overrides:
     */
    'arrow-body-style': ['off', 'as-needed'],
    'indent': ['warn', 2, { 'SwitchCase': 1 }],
    'import/default': 'off',
    'import/extensions': 'off',
    'import/first': 'off',
    'import/no-duplicates': 'warn',
    'import/no-extraneous-dependencies': 'off',
    'import/named': 'off',
    'import/namespace': ['off', { 'allowComputed': true }],
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-param-reassign': 'off',
    'semi': ['warn', 'always'],
    'no-trailing-spaces': 'off',
    'eol-last': 'off',
    'no-unused-vars': 'warn',
    'no-underscore-dangle': 'off',
    'no-alert': 'off',
    'no-lone-blocks': 'off'
  }
};
