module.exports = {
  extends: ['airbnb-base', 'prettier'],
  parser: 'babel-eslint',
  plugins: ['prettier'],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['./node_modules', './src'],
      },
    },
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-console': 0,
    'no-param-reassign': 0,
    'import/no-extraneous-dependencies': 0,
    'global-require': 0,
    'jsx-a11y/media-has-caption': 0,
    'import/prefer-default-export': 0,
    'max-len': 0,
    'no-underscore-dangle': 0,
    'arrow-body-style': [2, 'always'],
  },
};
