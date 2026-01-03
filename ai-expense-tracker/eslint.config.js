// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': [
        'error', {
          singleQuote: true,
          jsxSingleQuote: true,
          endOfLine: false,
        }
      ],
      quotes: [
        "error",
        "single",
      ],
      "@typescript-eslint/naming-convention": [
        "warn",
        // memaksa Type, Interface, Class, dan Enum pakai PascalCase
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },

        // Memaksa variabel biasa pakai camelCase
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
        },

        // memaksa fungsi pakai camelCase
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
        },
      ], 

      "@typescript-eslint/no-explicit-any": "error", // mencegah penggunaan tipe any
      "no-shadow": "error", // mencegah shadowing variabel
    }
  },
  expoConfig,
  {
    ignores: ["dist/*"],
  }
]);
