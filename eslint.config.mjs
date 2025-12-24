import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    rules: {
      "prettier/prettier": "error",

      // Optional but recommended
      "no-unused-vars": "warn",
      "no-console": "warn",
    },
  },

  // Ignore Next.js generated files
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),

  // Disable ESLint rules that conflict with Prettier
  prettier,
]);
