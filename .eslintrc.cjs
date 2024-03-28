/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  // 将浏览器API、ES API和NODE API看做全局变量，不会被特定的规则（如no-undef）限制
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-vars': 'warn',
    'spaced-comment': 'error',
    eqeqeq: 'error',
    'no-empty': 'warn',
  },
};
