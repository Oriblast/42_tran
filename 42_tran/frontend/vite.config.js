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
*/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // écoute sur toutes les interfaces
    port: 5173, // port par défaut de Vite
    key: '/path/to/your/private-key.pem',
    cert: '/path/to/your/certificate.pem',
  },
});