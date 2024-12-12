import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { watch } from 'vite-plugin-watch';

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.tsx',
      refresh: true
    }),
    react(),
    watch({
      pattern: 'app/{Data,Enums}/**/*.php',
      command: 'php artisan typescript:transform'
    }),
    watch({
      pattern: 'routes/web.php',
      command: ['php artisan ziggy:generate', 'prettier --write resources/js/ziggy.js']
    })
  ],
  resolve: {
    alias: {
      ui: resolve('resources/js/components/ui/index.ts'),
      layouts: resolve('resources/js/Layouts/index.ts'),
      components: resolve('resources/js/components'),
      'ziggy-js': resolve('vendor/tightenco/ziggy')
    }
  }
});
