module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'unused-imports'],

  rules: {
    'comma-dangle': [2, 'always-multiline'],
    'object-shorthand': [
      2,
      'always',
      {
        ignoreConstructors: false,
      },
    ],
    'max-len': [
      2,
      120,
      {
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    'consistent-return': 0,

    'prefer-destructuring': [
      2,
      { array: false, object: false },
      { enforceForRenamedProperties: false },
    ],
    'prefer-object-spread': 0, // until node 8 is required
    'prefer-rest-params': 0, // until node 6 is required
    'prefer-spread': 0, // until node 6 is required
    'function-call-argument-newline': 1, // TODO: enable
    'function-paren-newline': 0,
    'no-plusplus': 1,
    'no-param-reassign': 1,
    'no-unreachable-loop': 1, // TODO: enable
    'no-restricted-syntax': [
      2,
      {
        selector: 'ObjectPattern',
        message: 'Object destructuring is not compatible with Node v4',
      },
    ],
    strict: [2, 'safe'],
    'valid-jsdoc': [
      2,
      {
        requireReturn: false,
        requireParamDescription: false,
        requireReturnDescription: false,
      },
    ],
    '@typescript-eslint/no-unused-vars': 'warn',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    'eslint-plugin/consistent-output': 0,
    'eslint-plugin/require-meta-schema': 0,
    'eslint-plugin/require-meta-type': 0,
  },
};
