import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  // 1. Keep your output ignoring isolated
  globalIgnores(['dist']),

  // 2. Expand standard TypeScript configs
  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts'],

    // 3. Load basic recommended JS rules
    extends: [
      js.configs.recommended,
    ],

    // 4. Force Node environment variables instead of standard browser DOMs
    languageOptions: {
      globals: globals.node,
      parser: tseslint.parser,
    },

    // 5. Add custom server rules
    rules: {
      'no-console': 'off', // Keeps standard console.log visible for servers
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
]);
