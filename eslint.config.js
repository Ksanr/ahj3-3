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
        files: ["*.config.js", "*.setup.js", "eslint.config.js"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "commonjs",
            globals: {
                ...globals.node,
            },
        },
        rules: {
            "no-console": "off",
            "no-unused-vars": "warn",
            "no-undef": "off",
        },
    },
    {
        ignores: [
            "dist/",
            "node_modules/",
            "coverage/",
            ".yarn/",
            "**/*.test.js",
            "webpack.config.js",
        ],
    },
];
