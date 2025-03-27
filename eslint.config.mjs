import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    parserOptions: {
      project: "./tsconfig.json", 
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-useless-constructor": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-empty-function": ["warn", { "allow": ["private-constructors"] }],
      "@typescript-eslint/no-empty-interface": ["warn", { "allowSingleExtends": true }],
      "@typescript-eslint/no-inferrable-types": ["warn", { "ignoreParameters": true }],
      "@typescript-eslint/no-use-before-define": ["warn", { "functions": false, "classes": false }],
      "@typescript-eslint/no-unused-expressions": ["warn", { "allowShortCircuit": true, "allowTernary": true }],
      "@typescript-eslint/no-useless-constructor": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/explicit-function-return-type": ["warn", { "allowExpressions": true }],
    },
  },
];

export default eslintConfig;
