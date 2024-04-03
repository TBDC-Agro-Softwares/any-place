module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'airbnb-base',
    'eslint-config-prettier',
    '@vue/typescript',
    'plugin:storybook/recommended'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'no-console': [
      'warn',
      {
        allow: ['warn']
      }
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-underscore-dangle': 'off',
    'vue/no-reserved-keys': 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'no-useless-escape': 'off',
    'max-len': [
      2,
      {
        code: 150,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true
      }
    ],
    'vue/no-computed-properties-in-data': 'off',
    'no-bitwise': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-use-before-define': ['error', { functions: false }]
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.vue', '.json', '.js', '.ts']
      }
    }
  },
  plugins: ['eslint-plugin-prettier']
};
