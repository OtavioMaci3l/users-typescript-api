import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import { defineConfig } from "eslint/config";
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], languageOptions: { globals: globals.node } },
  ...tseslint.configs.recommended, // Spread recommended TypeScript configurations
  // Add project-aware linting configuration for TypeScript files
  {
    files: ["**/*.{ts,mts,cts}"], // Target TypeScript files
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json", // Path to your tsconfig.json
        tsconfigRootDir: __dirname, // Root directory for resolving tsconfig.json path
      },
    },
  },
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm", extends: ["markdown/recommended"] },
]);
