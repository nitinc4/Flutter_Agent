import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: [
      '@codemirror/state',
      '@codemirror/view',
      '@codemirror/language'
    ],
  },
  optimizeDeps: {
    include: [
      '@codemirror/state',
      '@codemirror/view',
      '@codemirror/lang-javascript',
      '@codemirror/lang-yaml', 
      '@codemirror/lang-markdown',
      '@uiw/codemirror-theme-vscode',
      '@uiw/react-codemirror'
    ],
  },
});