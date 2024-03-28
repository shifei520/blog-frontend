module.exports = {
  configBasedir: __dirname,
  extends: [
    'stylelint-config-standard-scss',
    // 'stylelint-config-prettier', // stylelint15版本以上不需要这个插件了
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-recess-order',
  ],
  rules: {
    'max-line-length': 100,
    'scss/dollar-variable-pattern': null,
    'scss/at-mixin-pattern': null,
    'media-feature-range-notation': 'prefix',
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values'],
      },
    ],
  },
};
