module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'airbnb-base',
    'plugin:prettier/recommended',
    // ts的语法检查放在parserOptions里
    // 'eslint:recommended',
    // 'plugin:vue/essential',
    // 'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          ...// 保持airbnb-base中的规则不变
          '**vite**', // ++
          '**@vitejs**', // ++
        ],
        optionalDependencies: false,
      },
    ],
  },
};
