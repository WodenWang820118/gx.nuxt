// const { FlatCompat } = require('@eslint/eslintrc');
// const js = require('@eslint/js');
const baseConfig = require('../../eslint.config.js');
// const vueParser = require('vue-eslint-parser');
// const eslintPluginVue = require('eslint-plugin-vue');

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
//   recommendedConfig: js.configs.recommended
// });

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.vue'],
    // Override or add rules here
    rules: {}
  },
  {
    ignores: ['.nuxt/**', '.output/**', 'node_modules']
  }
  // {
  //   rules: {}
  // }
  // {
  //   files: ['**/*.vue'],
  //   languageOptions: {
  //     parser: vueParser,
  //     parserOptions: {
  //       ecmaVersion: 'latest',
  //       sourceType: 'module',
  //       // If you're using TypeScript in Vue components:
  //       parser: require('@typescript-eslint/parser')
  //     }
  //   },
  //   plugins: {
  //     vue: eslintPluginVue
  //   },
  //   rules: {
  //     ...eslintPluginVue.configs.recommended.rules,
  //     'vue/html-self-closing': 'off'
  //   }
  // }
];
