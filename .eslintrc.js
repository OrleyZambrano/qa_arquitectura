module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'eslint:recommended',
        'prettier'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    env: {
        node: true,
        es6: true,
        jest: true,
    },
    rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        'complexity': ['error', 10],
        'max-lines-per-function': ['error', 50],
        'max-depth': ['error', 4],
        // Reglas básicas de TypeScript
        'no-undef': 'off', // TypeScript ya maneja esto
        'no-unused-vars': 'off', // Usamos la versión de TypeScript
    },
    overrides: [
        {
            files: ['**/*.test.ts', '**/*.spec.ts'],
            rules: {
                'max-lines-per-function': ['error', 200], // Permitir funciones más largas en tests
                'complexity': 'off', // Los tests pueden ser más complejos
            }
        }
    ]
};
