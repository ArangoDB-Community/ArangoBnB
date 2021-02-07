module.exports = {
  extends: ['airbnb', 'prettier'],
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
    'prettier/prettier': 'error',
    'no-console': 0,
    'no-param-reassign': 0,
    'import/no-extraneous-dependencies': 0,
    'global-require': 0,
    'jsx-a11y/media-has-caption': 0,
    'import/prefer-default-export': 0,
    'max-len': 0,
    'no-underscore-dangle': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/forbid-prop-types': 0,
    'react/require-default-props': 0,
    'arrow-body-style': [2, 'always'],
  },
  globals: {
    document: true,
    window: true,
  },
};
