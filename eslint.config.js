const js = require("@eslint/js");
const prettierConfig = require("eslint-config-prettier");
const globals = require("globals");

module.exports = [
    js.configs.recommended,
    prettierConfig,
    {
        files: ["src/**/*.js"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.jest,
            },
        },
        rules: {
            "no-console": "warn",
            "no-unused-vars": "warn",
            "no-undef": "error",
        },
    },
    {
        ignores: [
            "dist/",
            "node_modules/",
            "coverage/",
            ".yarn/",
            ".pnp.cjs",
            ".pnp.loader.mjs",
            "**/*.test.js",
            "*.config.js",
            "jest.setup.js",
            "webpack.config.js",
            "babel.config.js",
        ],
    },
];
