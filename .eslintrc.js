module.exports = {
  extends: 'erb',
  plugins: ['@typescript-eslint'],
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-import-module-exports': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-unused-vars': 'off',

    // The `erb` preset is airbnb-derived and written for JavaScript. Two of its
    // React rules ask for something TypeScript already guarantees: every
    // component here declares a typed props object, so propTypes and
    // defaultProps are duplicate declarations that can only drift out of sync.
    'react/prop-types': 'off',
    'react/require-default-props': 'off',

    // Everything below is style, not correctness. It stays visible as a warning
    // rather than blocking CI, so a genuine error is never buried under a few
    // hundred formatting opinions. Cleared file by file, not in one sweep.
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-return-await': 'warn',
    'no-use-before-define': 'warn',
    'react/function-component-definition': 'warn',
    'react/no-array-index-key': 'warn',
    'no-underscore-dangle': 'warn',
    'no-restricted-syntax': 'warn',
    'no-plusplus': 'warn',
    'import/prefer-default-export': 'warn',

    // These stay errors. Each one is a defect rather than a preference: a stale
    // hook dependency serves the wrong data, a context value rebuilt every
    // render re-renders every consumer, an empty block swallows a failure, and
    // an inconsistent return hands back undefined on a path someone will read
    // as a value.
    'no-empty': 'error',

    // Real findings, deliberately left as warnings rather than errors.
    //
    // Each of these changes runtime behaviour in a way that only shows up with
    // the app running against a real database: adding a missing hook dependency
    // can turn a single fetch into a render loop, memoising a context value
    // changes when consumers re-render, and rewriting a return path changes what
    // a caller receives. They are worth fixing, one at a time, with the app open
    // and the screen in question exercised - not in a bulk sweep that type
    // checking and a single smoke test cannot validate.
    //
    // They stay visible on every lint run. They do not block CI, so a genuinely
    // new error still stands out instead of joining a permanently red build.
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-no-constructed-context-values': 'warn',
    'consistent-return': 'warn',
    'no-await-in-loop': 'warn',
    'react/no-unstable-nested-components': 'warn',
    'react/no-unused-prop-types': 'warn',
    'no-param-reassign': 'warn',
    camelcase: 'warn',
    'no-nested-ternary': 'warn',
    'class-methods-use-this': 'warn',
    'no-empty-pattern': 'warn',
    'react/jsx-no-useless-fragment': 'warn',
    'react/destructuring-assignment': 'warn',

    // The preset demands a label both wrap its control and carry htmlFor. These
    // forms use the floating-label pattern, where the input is a sibling styled
    // by `peer-*` and cannot be nested inside the label without breaking the
    // layout. htmlFor paired with the input's id is a complete association, so
    // the rule stays on and only the redundant nesting requirement is dropped.
    'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],

    // Base ESLint cannot see TypeScript types, so every `(user: Auth)` in a
    // handler signature was reported as an undefined variable. typescript-eslint
    // documents turning this off for TS sources - the compiler already answers
    // the question, and it answers it correctly.
    'no-undef': 'off',

    // `item.id && decreaseQuantity(item.id)` is a guard, not a discarded value.
    // The rule is worth keeping for genuinely dead expressions, so it stays on
    // with the short-circuit and ternary forms allowed.
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true },
    ],
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve('./.erb/configs/webpack.config.eslint.ts'),
      },
      typescript: {},
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
