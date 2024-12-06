import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        // Don't flag standard browser global variables as undefined
        ...globals.browser,
        // Don't flag 'browser' global from WebExtensions
        browser: "readonly"
      }
    }
  },
  pluginJs.configs.recommended,
];
