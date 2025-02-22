import tailwindcssPlugin from '@tailwindcss/vite';
   import viteReactPlugin from '@vitejs/plugin-react';
   import { defineConfig } from 'vite';
   import viteConfigPaths from 'vite-tsconfig-paths';
   export default defineConfig({
     build: {
       reportCompressedSize: false,
       commonjsOptions: { transformMixedEsModules: true },
     },
     plugins: [
       tailwindcssPlugin(),
       viteConfigPaths(),
       viteReactPlugin(),
     ],
     server: {
      //  proxy: {
      //    '/api': {
      //      target: 'https://futures.testnet.mexc.com',
      //      changeOrigin: true,
      //      rewrite: (path) => path.replace(/^\/api/, ''),
      //    },
      //  },
      //  host: "0.0.0.0",
      //  port: 3000
     },
   });