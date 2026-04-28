import esbuild from 'esbuild';
import { fileURLToPath } from 'url';
import path from 'path';

// Define the banner string with appropriate line breaks
const bannerText = `
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
`;

esbuild.build({
  entryPoints: ['src/server.ts'], // Target your primary server file
  bundle: true,                    // Combine everything into one file
  platform: 'node',                // Target Node.js environment
  format: 'esm',                   // Target ES Modules output
  outfile: 'dist/index.js',       // Destination for final bundle
  banner: {
    js: bannerText,                // Prepend full polyfill to file top
  },
}).then(() => {
  console.log('⚡ Build complete: dist/index.js created successfully!');
}).catch(() => process.exit(1));
