module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 2017
    },
    "rules": {
        "semi": [
            "error",
            "always"
        ],
        "no-console": ["error", {
            allow: ["error"]
        }]
    }
};