import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      'lucide-react',
      '@codemirror/state',
      '@codemirror/view',
      '@codemirror/lang-javascript',
      '@codemirror/lang-typescript',
      '@codemirror/lang-dart',
      '@codemirror/theme-one-dark',
      '@codemirror/commands',
      '@codemirror/search',
      '@codemirror/autocomplete',
      '@codemirror/lint'
    ],
  },
});