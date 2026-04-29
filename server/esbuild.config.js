import esbuild from 'esbuild';

const bannerText = `
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
`.trim();

esbuild.build({
  entryPoints: ['src/server.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: 'dist/index.js',
  minify: true,
  sourcemap: true,
  metafile: true,
  // Node 24 optimizations
  target: 'node24',            // Use latest JS features (less glue code)
  packages: 'external',        // Don't bundle node_modules (massive size drop)
  legalComments: 'none',       // Remove all license comments from output
  treeShaking: true,           // Force remove unused code
  keepNames: true,             // Helps swagger-jsdoc identify functions
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  banner: { js: bannerText },
}).then((result) => {
  const stats = result.metafile.outputs['dist/index.js'];
  if (stats) {
    console.log(`⚡ Node 24 Build complete!`);
    console.log(`📦 Size: ${(stats.bytes / 1024).toFixed(2)} KB`);
  }
}).catch(() => process.exit(1));
