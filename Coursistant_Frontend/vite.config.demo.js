import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import react from '@vitejs/plugin-react-swc';

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [
    react(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
      },
      overlay: false
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
    ],
  },
  server: {
    port: 4001,
    proxy: {
      '/readDB': {
        target: 'http://lax.nonev.win:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  preview: {
    port: 3030,
  },
  build: {
    rollupOptions: {
      onwarn: (warning, warn) => {
        // Suppress all warnings except for the specified types
        if (warning.code !== 'UNUSED_EXTERNAL_IMPORT') {
          warn(warning);
        }
      }
    }
  }
});
