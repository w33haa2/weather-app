module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: [
    'eslint:recommended',
    '@nuxtjs',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
    'import/no-named-as-default': 0,
    'vue/multi-word-component-names': 0,
    'vue/no-useless-template-attributes': 0,
  },
}
