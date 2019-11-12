// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    //'generator-star-spacing': 'off',
    // allow debugger during development
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    //ignore the paren check before function.
    'space-before-function-paren': [0, 'always'],
    //ignore the space before block.
    'space-before-blocks': [0, 'always'],
    //ignore the empty line check.
    'no-multiple-empty-lines': [0, {'max': 2}],
    //semicolon or no semicolon is ok.
    'semi': [0, 'always'],
    //ignore the space before or after =>
    'arrow-spacing': 0,
    //the type of quotes
    'quotes': [0, 'single'],
    //block can be padded by blank lines
    'padded-blocks': 0,
    //comma spacing before or after.
    'comma-spacing': 0,
    //key spacing.
    'key-spacing': [0, {'beforeColon': false, 'afterColon': true}],
    //trailing spaces
    'no-trailing-spaces': 0,
    //spaced comment
    'spaced-comment': 0,
    //keyword-spacing
    'keyword-spacing': 0,
    'space-in-parens': 0,
    'no-extend-native': 0,
    'no-useless-escape': 0,
    'no-unused-vars': 0,
    'no-undef': 0,
    'no-tabs': 0,
    'indent': 0,
    'no-multi-spaces': 0,
    'eol-last': 0,
    'no-template-curly-in-string': 0,
    'no-mixed-spaces-and-tabs': 0,
    'handle-callback-err': 0,
    "import/no-webpack-loader-syntax": "off"
  }
}
