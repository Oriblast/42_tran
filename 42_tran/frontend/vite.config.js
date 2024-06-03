// vite.config.js
/*import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173
  }
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // écoute sur toutes les interfaces
    https: {
      key: './ss1/localhost-key.pem',
      cert: './ss1/localhost.pem',
    },
    port: 5173, // port par défaut de Vite
  },
  
});*/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // écoute sur toutes les interfaces
   https: {
      key: './ssl/private-key.pem',
      cert: './ssl/certificate.pem',
    },
    port: 5173,
  }
});
