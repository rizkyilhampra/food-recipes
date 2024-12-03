import './../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Providers } from './components/providers';

createInertiaApp({
  resolve: (name) =>
    resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
  setup({ el, App, props }) {
    createRoot(el).render(
      <Providers>
        <App {...props}></App>
      </Providers>
    );
  }
});
