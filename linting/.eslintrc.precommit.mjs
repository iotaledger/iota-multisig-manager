// Copyright (c) 2025 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

// Flat config (ESM) for ESLint v9+ used by pre-commit
// Keeps the same intent as the previous legacy config

import tsParser from '@typescript-eslint/parser';
import licensePlugin from './plugin.js';

export default [
  {
    files: ['{sdk,app,api}/**/*.{ts,tsx,js,mjs}'],
    // If you need to ignore specific paths, add them here
    // ignores: ['sdk/create-dapp/templates/**/*'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      'license-check': licensePlugin,
    },
    rules: {
      'license-check/license-check': 'error',
    },
  },
];

