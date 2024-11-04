const baseConfig = require('../../eslint.config.js');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.vue'],
    // Override or add rules here
    rules: {}
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: { parser: require('@typescript-eslint/parser') }
    }
  },
  { ignores: ['.nuxt/**', '.output/**', 'node_modules'] }
];