module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
        "jest": true,
    },
    "globals": {
        "$": true,
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        },
    },
    "plugins": [
        "react",
    ],
    "rules": {
        "comma-dangle": ["error", "always-multiline"],
        "indent": ["error", 4],
        "linebreak-style": ["error", "windows"],
        "quotes": ["error", "single"],
        "semi": ["error", "never"],
        "no-unused-vars": ["warn"],
        "no-console": 0,
    },
};