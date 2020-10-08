module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  // parserOptions: {
  //   // parser: "babel-eslint",
  //   parser: "vue-eslint-parser",

  // },
  parser: 'vue-eslint-parser',

  extends: [
    'eslint:recommended',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'prettier/vue',
    'prettier',
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    // semi: [2, "never"],
    'no-console': 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 3,
        multiline: {
          max: 1,
          allowFirstLine: true,
        },
      },
    ],
    // "vue/multiline-html-element-content-newline": "off"
    // "prettier/prettier": ["error", { semi: false }]
  },
};
