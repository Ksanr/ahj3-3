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
                ...globals.node,
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
            "webpack.config.js",
            "coverage/",
        ],
    },
];
