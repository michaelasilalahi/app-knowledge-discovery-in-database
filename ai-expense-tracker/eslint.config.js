// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  {
    rules: {
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
