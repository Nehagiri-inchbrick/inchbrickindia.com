const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
let inBody = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('<body')) {
    inBody = true;
    console.log('Body starts at line: ' + (i+1));
  } else if (line.includes('</body')) {
    console.log('Body ends at line: ' + (i+1));
    inBody = false;
  } else if (inBody) {
    const trimmed = line.trim();
    if (trimmed.startsWith('<div class=')) {
      const match = trimmed.match(/class="([^"]+)"/);
      if (match) {
        // Only print main containers to reduce noise, e.g. <div class="container">
        // Let's just print anything that looks like a major section or has ID
        console.log('Line ' + (i+1) + ': <div class="' + match[1] + '">');
      }
    } else if (trimmed.startsWith('<section')) {
      console.log('Line ' + (i+1) + ': ' + trimmed.substring(0, 50));
    } else if (trimmed.startsWith('<header')) {
      console.log('Line ' + (i+1) + ': <header>');
    } else if (trimmed.startsWith('<footer')) {
      console.log('Line ' + (i+1) + ': <footer>');
    }
  }
}
