const plugins = ['import', 'promise']
const pluginsTs = [...plugins, '@typescript-eslint']

const configs = [
  'eslint:recommended',
  'plugin:import/errors',
  'plugin:import/warnings',
  'plugin:promise/recommended',
  'plugin:node/recommended',
  'airbnb-base',
  'prettier',
]
const configsTs = [
  ...configs,
  'airbnb-typescript/base',
  'plugin:import/typescript',
  'plugin:@typescript-eslint/recommended',
  'plugin:@typescript-eslint/recommended-requiring-type-checking',
  'prettier',
]

const parserOptions = {
  ecmaVersion: 2021,
  sourceType: 'module',
}

const rules = {
  'no-console': 'warn',
  'no-var': 'error',
  'prefer-const': 'error',
  'prefer-rest-params': 'error',
  'prefer-spread': 'error',
  'prefer-template': 'warn',
  'prefer-arrow-callback': 'error',
  camelcase: 'warn',
  'no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    },
  ],
}

const rulesTs = {
  ...rules,
  'no-use-before-define': 'off',
  '@typescript-eslint/no-use-before-define': ['error'],
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    },
  ],
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/restrict-plus-operands': 'error',
  '@typescript-eslint/no-extra-non-null-assertion': 'error',
  '@typescript-eslint/prefer-nullish-coalescing': 'error',
  '@typescript-eslint/prefer-optional-chain': 'error',
  'node/no-unsupported-features/es-syntax': [
    'error',
    {
      ignores: ['modules'],
    },
  ],
  'node/no-unpublished-import': [
    'error',
    {
      tryExtensions: ['.js', '.json', '.node', '.ts', '.d.ts'],
    },
  ],
}

module.exports = {
  root: true,
  plugins,
  extends: configs,
  parserOptions,
  settings: {
    node: {
      resolvePaths: ['node_modules/@types'],
      tryExtensions: ['.js', '.json', '.node', '.ts', '.d.ts'],
    },
  },
  rules,
  overrides: [
    {
      files: ['**/*.js'],
      env: {
        node: true,
        browser: false,
      },
    },
    {
      files: ['**/*.ts'],
      env: {
        node: true,
        browser: false,
      },
      plugins: pluginsTs,
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ...parserOptions,
        project: './tsconfig.json',
      },
      extends: configsTs,
      rules: rulesTs,
    },
    {
      files: ['./src/**/*.ts', './src/**/*.tsx'],
      env: {
        node: false,
        browser: true,
      },
    },
  ],
}
