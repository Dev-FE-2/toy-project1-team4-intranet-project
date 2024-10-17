module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "no-unused-vars": "off",
  },
};
