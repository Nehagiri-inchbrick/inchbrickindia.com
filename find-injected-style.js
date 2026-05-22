const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const target = '/* Luxury Hero Banner Styles */';
const idx = content.indexOf(target);
if (idx === -1) {
  console.log('Could not find target style comment');
  process.exit(0);
}

// Find the <style> before this target
const styleStart = content.lastIndexOf('<style>', idx);
const styleEnd = content.indexOf('</style>', idx) + '</style>'.length;

const lines = content.substring(0, styleStart).split('\n').length;
const endLines = content.substring(0, styleEnd).split('\n').length;

console.log(`Injected style found between line ${lines} and ${endLines}`);
fs.writeFileSync('injected-style-range.txt', `${lines} to ${endLines}`);
