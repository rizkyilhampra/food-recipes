import './../css/app.css';
import './bootstrap';

import { Ziggy } from '@/ziggy';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { useRoute } from '../../vendor/tightenco/ziggy/src/js';
import { Providers } from './components/providers';

createInertiaApp({
  resolve: (name) =>
    resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
  setup({ el, App, props }) {
    // @ts-expect-error
    window.route = useRoute(Ziggy as any);
    createRoot(el).render(
      <Providers>
        <App {...props}></App>
      </Providers>
    );
  }
});
