/**
 * Production Server Entrypoint
 * Used by Hostinger, VPS, and Node.js hosting environments where "server.js" is the default entry file.
 */
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}
import './dist/server.js';
