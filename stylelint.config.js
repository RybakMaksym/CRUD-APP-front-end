module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-scss',
  ],
  plugins: ['stylelint-scss'],
  rules: {
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'declaration-block-no-duplicate-properties': true,
    'no-descending-specificity': null,
    'at-rule-disallowed-list': [
      'import',
      {
        message:
          'Do not use @import in scss - it is deprecated. Use @use or @forward instead.',
      },
    ],
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment', 'stylelint-commands'],
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
};
