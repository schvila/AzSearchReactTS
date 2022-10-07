/* eslint-disable sort-keys-fix/sort-keys-fix */
module.exports = {
  bracketSpacing: true,
  jsxBracketSameLine: false,
  printWidth: 120,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  endOfLine: 'lf',
  tabWidth: 2,
  useTabs: false,
  overrides: [
    {
      files: '*.d.ts',
      options: {
        // This is needed for TypeScript 3.2 support
        trailingComma: 'es5',
      },
    },
    {
      files: ['docs/**/*.md'],
      options: {
        // otherwise code blocks overflow on the docs website
        printWidth: 80,
      },
    },
  ],
};
