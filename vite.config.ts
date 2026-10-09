import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // Set VITE_BASE to "/<repo>/" when the site is served from a sub-path.
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
});
