const fs = require('fs');
const path = require('path');

const ignoreDirs = ['.next', 'node_modules', '.git', 'public', 'data']; // Add directories you want to ignore

const createTree = (dir, indent = '') => {
  let tree = '';
  const files = fs.readdirSync(dir);

  files.forEach((file, index) => {
    const fullPath = path.join(dir, file);
    const isLastFile = index === files.length - 1;
    const stats = fs.statSync(fullPath);

    if (ignoreDirs.includes(file)) {
      return;
    }

    if (stats.isDirectory()) {
      tree += `${indent}├── ${file}/\n`;
      tree += createTree(fullPath, `${indent}│   `);
    } else {
      tree += isLastFile
        ? `${indent}└── ${file}\n`
        : `${indent}├── ${file}\n`;
    }
  });

  return tree;
};

const tree = createTree('.'); // Change this path to match your root directory
fs.writeFileSync('tree.txt', tree);
console.log('File tree generated successfully.');
