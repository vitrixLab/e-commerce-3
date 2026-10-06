import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: ["src/generated/**"],
  },

  ...coreWebVitals,
  ...typescript,

  // The in-memory Prisma-compatible store is a dynamic query engine: model
  // rows and delegate arguments are necessarily loosely typed.
  {
    files: ["src/app/lib/mock/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
