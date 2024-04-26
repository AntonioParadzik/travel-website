module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true // Add Jest environment
    },
    extends: [
        'standard',
        'plugin:prettier/recommended',
        'plugin:react/recommended'
    ], // Add 'plugin:prettier/recommended' here
    overrides: [
        {
            env: {
                node: true
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    settings: {
        react: {
            version: 'detect' // or specify the exact version if you know it, e.g., "17.0.2"
        }
    },
    rules: {
        // suppress errors for missing 'import React' in files
        'react/react-in-jsx-scope': 'off',
        'react/no-unescaped-entities': 'off',
        'react/prop-types': 'off'
    }
}
