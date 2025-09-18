const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../out');
const noJekyllFile = path.join(outDir, '.nojekyll');

// The 'npm run build' command in predeploy should have already created the 'out' directory.
// We just need to create the .nojekyll file inside it.
if (fs.existsSync(outDir)) {
  fs.writeFileSync(noJekyllFile, '');
  console.log('Successfully created .nojekyll file for GitHub Pages.');
} else {
  console.error("'out' directory not found. Please run 'next build' first.");
  process.exit(1);
}
