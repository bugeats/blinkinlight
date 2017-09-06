module.exports = {
    'extends': 'eslint:recommended',
    'parser': 'babel-eslint',
    'plugins': [
        'react'
     ],
    'parserOptions': {
        'ecmaVersion': 6,
        'sourceType': 'module',
        'ecmaFeatures': {
          'jsx': true
        }
    },
    'env': {
        'browser': true,
        'amd': true,
        'es6': true,
        'node': true,
        'mocha': true
    },
    'rules': {
        'brace-style': [2, '1tbs'],
        'camelcase': 1,
        'comma-dangle': [2, 'never'],
        'comma-spacing': [2, { 'before': false, 'after': true }],
        'comma-style': [2, 'last'],
        'consistent-return': 2,
        'eqeqeq': 2,
        'global-strict': 0,
        'indent': [2, 4],
        'linebreak-style': [2, 'unix'],
        'no-alert': 0,
        'no-console': 1,
        'no-else-return': 2,
        'no-extra-semi': 1,
        'no-redeclare': 0,
        'no-trailing-spaces': [1, { 'skipBlankLines': true }],
        'no-undef': 1,
        'no-underscore-dangle': 0,
        'no-unreachable': 1,
        'no-unused-vars': 1,
        'object-curly-spacing': [2, 'always'],
        'quotes': [ 1, 'single' ],
        'quotes': [2, 'single'],
        'react/jsx-indent': [2, 2],
        'react/jsx-uses-react': 1,
        'react/jsx-uses-vars': 1,
        'semi': [2, 'always'],
        'semi-spacing': [2, { 'before': false, 'after': true }],
        'space-before-blocks': [2, 'always'],
        'space-before-function-paren': [2, { 'anonymous': 'always', 'named': 'never' }],
        'space-in-parens': [2, 'never'],
        'strict': 0
    }
};
