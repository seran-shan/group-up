module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:import/typescript'],
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
    'no-await-in-loop': 0,
    'no-return-await': 0,
    'react/function-component-definition': 0,
    'no-use-before-define': 0,
    'react/jsx-props-no-spreading': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'comma-dangle': [0, 'never'],

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

    strict: [2, 'safe'],
    'valid-jsdoc': [
      2,
      {
        requireReturn: false,
        requireParamDescription: false,
        requireReturnDescription: false,
      },
    ],
    '@typescript-eslint/no-unused-vars': 'error',
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
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/anchor-has-content': 'off',

    'eslint-plugin/consistent-output': 0,
    'eslint-plugin/require-meta-schema': 0,
    'eslint-plugin/require-meta-type': 0,
    'react/jsx-no-constructed-context-values': 0,
  },
};
