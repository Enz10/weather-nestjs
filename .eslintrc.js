module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json']
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  rules: {
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-duplicate-imports': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {argsIgnorePattern: '^_', varsIgnorePattern: '^_'}
    ],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/no-empty-function': 'off',
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto'
      }
    ],
    'import/order': [
      'warn',
      {
        'groups': ['builtin', 'external', 'internal', ['parent', 'sibling']],
        'pathGroups': [
          {
            pattern: '~/**',
            group: 'internal',
            position: 'before'
          }
        ],
        'pathGroupsExcludedImportTypes': ['builtin'],
        'newlines-between': 'always',
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ]
  }
}
