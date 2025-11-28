import fs from 'fs';
import { execSync } from 'child_process';

const configContent = `
export default {
  // Point to the package source to enable scanning for DaisyUI component classes (like textarea-primary)
  content: ['./packages/**/*.{vue,js,ts}'], 
  
  // Disable ALL Core Plugins (flex, grid, p-4, etc.) to prevent conflicts with host project
  corePlugins: [], 
};
`;

console.log('Creating temporary tailwind.config.js for library build...');
fs.writeFileSync('tailwind.config.js', configContent);

try {
  console.log('Running vite build...');
  // We don't need clean-css anymore because corePlugins: [] prevents Preflight generation
  execSync('vite build', { stdio: 'inherit' });
} catch (e) {
  console.error('Build failed:', e);
  process.exit(1);
} finally {
  console.log('Removing temporary tailwind.config.js...');
  if (fs.existsSync('tailwind.config.js')) {
    fs.unlinkSync('tailwind.config.js');
  }
}
