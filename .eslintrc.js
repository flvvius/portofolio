module.exports = {
    root: true,
    // Extend Next's recommended ESLint config plus any other configs you need.
    extends: [
      'next/core-web-vitals', 
      'eslint:recommended', 
      'plugin:react/recommended', 
      'plugin:@typescript-eslint/recommended'
    ],
    rules: {
      // Disable the rule that warns about missing useEffect/useMemo dependencies:
      'react-hooks/exhaustive-deps': 'off',
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/jsx-no-target-blank": "off",
      "react/no-unknown-property": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "prefer-const": "off",
    "no-var": "off"
  
      // You can disable other rules here if you like:
      // 'react-hooks/rules-of-hooks': 'off',
      // 'no-console': 'off',
    },
  };
  