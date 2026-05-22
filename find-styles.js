const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const styleStart = content.indexOf('<style>');
const styleEnd = content.indexOf('</style>', styleStart);
const styleBlock = content.substring(styleStart, styleEnd);

const regex = /\.hero-luxury[^{]*\{([^}]*)\}/gi;
let match;
console.log('Searching style block...');
fs.writeFileSync('hero-styles.txt', '');
let results = [];
while (match = regex.exec(styleBlock)) {
  results.push(match[0]);
}

if (results.length > 0) {
  fs.writeFileSync('hero-styles.txt', results.join('\n\n'));
  console.log(`Found ${results.length} styles for .hero-luxury`);
} else {
  console.log('No specific .hero-luxury style blocks found in the style tag.');
  fs.writeFileSync('hero-styles.txt', 'No styles found');
}
