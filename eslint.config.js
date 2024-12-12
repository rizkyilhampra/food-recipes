import eslint from '@eslint/js';
import react from 'eslint-plugin-react';
import tslint from 'typescript-eslint';

export default tslint.config({
  files: ['resources/js/**/*.{ts,tsx}'],
  plugins: { react },
  extends: [eslint.configs.recommended, ...tslint.configs.recommended]
});
