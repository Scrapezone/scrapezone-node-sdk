module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2020: true,
        node: true
    },
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 11
    },
    rules: {
        'prettier/prettier': 'error',
        indent: ['error', 4],
        'comma-dangle': ['error', 'never'],
        'object-curly-spacing': [1, 'never'],
        'no-underscore-dangle': ['error', {allow: ['_id', '_doc']}],
        'no-restricted-syntax': 0,
        'class-methods-use-this': 0,
        'no-useless-constructor': 0,
        'no-empty-function': 0,
        'no-await-in-loop': 0,
        'func-names': 0,
        'no-use-before-define': 0,
        'no-param-reassign': 0,
        'consistent-return': 0,
        'no-plusplus': 0,
        'arrow-parens': 0,
        'import/no-extraneous-dependencies': 0
    }
};
