/* eslint-disable sort-keys-fix/sort-keys-fix */
'use strict';

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  plugins: [
    '@typescript-eslint',
    'typescript-sort-keys',
    'react-hooks',
    'import',
    'sort-keys-fix',
    'formatjs',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
    jsx: true,
    useJSXTextNode: true,
  },
  env: {
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-alert': 'error',
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        // used vs-code optimized import ordering => all types in single group
        groups: [['builtin', 'external', 'internal', 'unknown', 'parent', 'sibling', 'index', 'object']],
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@material-ui/*/*/*', '!@material-ui/core/test-utils/*'],
      },
    ],
    'sort-keys-fix/sort-keys-fix': ['error', 'asc', { caseSensitive: false, natural: true }],
    'typescript-sort-keys/interface': ['error', 'asc', { caseSensitive: false, natural: true }],
    'typescript-sort-keys/string-enum': ['error', 'asc', { caseSensitive: false }],

    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-sort-props': [
      'error',
      {
        ignoreCase: true,
        callbacksLast: false,
        shorthandFirst: false,
        reservedFirst: true,
      },
    ],

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],

    // ///
    // Format.js rules
    'formatjs/blacklist-elements': 'off',
    'formatjs/enforce-description': ['error', 'literal'],
    'formatjs/enforce-default-message': ['error', 'literal'],
    'formatjs/enforce-placeholders': 'error',
    'formatjs/enforce-plural-rules': ['error', { other: true }],
    'formatjs/no-camel-case': 'error',
    'formatjs/no-emoji': 'error',
    'formatjs/no-multiple-whitespaces': 'error',
    'formatjs/no-multiple-plurals': 'error',
    'formatjs/no-offset': 'error',
    'formatjs/enforce-id': [
      'error',
      {
        idInterpolationPattern: '[sha512:contenthash:base64:6]',
      },
    ],
    'formatjs/no-id': 'off',
    // Format.js rules
    // ///
  },

  overrides: [
    {
      files: ['*.tsx', '*.d.ts', '*.ts'],
      rules: {
        'react/prop-types': 'off',
      },
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
    {
      files: ['*.test.js', '*.test.ts', '*.test.tsx'],
      env: {
        jest: true,
      },
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      rules: {
        // does not work with wildcard imports. Mistakes will throw at runtime anyway
        'import/named': 'off',
        // for expect style assertions
        'no-unused-expressions': 'off',
      },
    },
  ],
};
