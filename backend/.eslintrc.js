module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    allowImportExportEverywhere: false,
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: ['graphql', 'prettier'],
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  env: {
    // browser: true,
    node: true,
  },
  rules: {
  },
};
