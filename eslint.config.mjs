import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import securityPlugin from "eslint-plugin-security";

export default [
    // Ignore patterns
    {
        ignores: [
            "**/dist/*",
            "**/coverage/*",
            "**/.github/*",
            "eslint.config.mjs",
            "jest.config.ts",
            "node_modules"
        ]
    },
    
    // JavaScript recommended rules
    eslint.configs.recommended,
    
    // TypeScript recommended rules
    ...tseslint.configs.recommended,
    
    // SECURITY RULES - This is what matters for the assignment
    {
        plugins: {
            security: securityPlugin,
        },
        rules: {
            // Your existing TypeScript rules
            "@typescript-eslint/explicit-function-return-type": "error",
            "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
            "@typescript-eslint/typedef": [
                "error",
                {
                    "parameter": true,
                    "propertyDeclaration": true,
                    "variableDeclaration": true,
                    "memberVariableDeclaration": true,
                    "variableDeclarationIgnoreFunction": true,
                },
            ],
            "@typescript-eslint/no-require-imports": "off",
            "@typescript-eslint/no-var-requires": "off",
            
            // NEW: Security rules (for the assignment)
            "security/detect-object-injection": "warn",
            "security/detect-possible-timing-attacks": "warn",
            "security/detect-eval-with-expression": "error",
            "security/detect-no-csrf-before-method-override": "warn",
        },
    },
];