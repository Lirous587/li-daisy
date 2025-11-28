import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.resolve(__dirname, '../dist/style.css');

if (!fs.existsSync(filePath)) {
  console.error('dist/style.css not found!');
  process.exit(1);
}

let css = fs.readFileSync(filePath, 'utf-8');

// Helper function to remove a block starting with a specific string
function removeBlock(css, startIdentifier) {
  const startIndex = css.indexOf(startIdentifier);
  if (startIndex === -1) {
    console.log(`Block '${startIdentifier}' not found.`);
    return css;
  }

  let openBraces = 0;
  let endIndex = -1;
  let foundStart = false;

  for (let i = startIndex; i < css.length; i++) {
    if (css[i] === '{') {
      openBraces++;
      foundStart = true;
    } else if (css[i] === '}') {
      openBraces--;
    }

    if (foundStart && openBraces === 0) {
      endIndex = i;
      break;
    }
  }

  if (endIndex !== -1) {
    console.log(`Removing block starting at index ${startIndex} and ending at ${endIndex}`);
    // Check if it's the Preflight block (contains html or body reset)
    const blockContent = css.substring(startIndex, endIndex + 1);
    if (blockContent.includes('html') || blockContent.includes('body') || blockContent.includes('box-sizing:border-box')) {
        console.log('Confirmed Preflight block. Removing...');
        return css.substring(0, startIndex) + css.substring(endIndex + 1);
    } else {
        console.log('Block does not look like Preflight. Keeping it.');
        // If you want to remove specific blocks, adjust logic here
        return css;
    }
  } else {
    console.error('Could not find end of block.');
    return css;
  }
}

// Remove @layer base
// Note: In minified CSS, spaces might be missing.
// Search for "@layer base{" or "@layer base {"
let startIdentifier = "@layer base{";
if (css.indexOf(startIdentifier) === -1) {
    startIdentifier = "@layer base {";
}

// There might be multiple @layer base blocks? Usually one merged block in production.
// Loop until no more preflight blocks found.
let originalLength = css.length;
let iterations = 0;
while (true) {
    iterations++;
    const prevLength = css.length;
    css = removeBlock(css, startIdentifier);
    if (css.length === prevLength) {
        break;
    }
    if (iterations > 10) { // Safety break
        console.log('Too many iterations, stopping.');
        break;
    }
}

if (css.length < originalLength) {
    console.log(`Removed total ${originalLength - css.length} characters.`);
    fs.writeFileSync(filePath, css, 'utf-8');
    console.log('dist/style.css updated successfully.');
} else {
    console.log('No changes made to dist/style.css');
}