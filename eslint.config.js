const nx = require('@nx/eslint-plugin');
const vueParser = require('vue-eslint-parser');
const eslintPluginVue = require('eslint-plugin-vue');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist']
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.vue'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*']
            }
          ]
        }
      ]
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {}
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // If you're using TypeScript in Vue components:
        parser: require('@typescript-eslint/parser')
      }
    },
    plugins: {
      vue: eslintPluginVue
    },
    rules: {
      ...eslintPluginVue.configs.recommended.rules,
      'vue/html-self-closing': 'off'
    }
  }
];
