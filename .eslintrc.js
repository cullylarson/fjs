module.exports = {
    'extends': ['standard'],
    'env': {
        'es6': true,
        'jest': true,
    },
    'parserOptions': {
        'ecmaVersion': 6,
        'sourceType': 'module',
    },
    'rules': {
        'indent': ['error', 4, {'SwitchCase': 1}],
        'space-before-function-paren': ['error', 'never'],
        'keyword-spacing': 'off',
        'object-curly-spacing': 'off',
        'brace-style': ['error', 'stroustrup', {'allowSingleLine': true}],
        'quotes': ['error', 'single', {'avoidEscape': true}],
        'comma-dangle': ['error', 'always-multiline'],
        'operator-linebreak': ['error', 'before'],
    },
}
