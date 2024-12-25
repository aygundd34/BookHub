import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    postcss: './postcss.config.js', // Tailwind için PostCSS kullanarak uygun konfigürasyonu belirtiriz
  },
});
