// .eslintrc.js
module.exports = {
  // Define the environments your code runs in (browser, node, etc.)
  env: {
    browser: true,
    es2021: true,
  },
  // Use the parser for TypeScript
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  // ESLint plugins
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'import',
    'jsx-a11y',
    'prettier',
  ],
  // "extends" lets you use recommended rules from each plugin
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  // Override or add additional rules
  rules: {
    // Enable Prettier checks
    'prettier/prettier': 'warn',

    // Example rule overrides (optional):
    // 'react/prop-types': 'off', // if using TS, prop-types are often unnecessary
    // '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  // Auto-detect the version of React to use
  settings: {
    react: {
      version: 'detect',
    },
  },
};
