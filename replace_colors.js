const fs = require('fs');

try {
  let content = fs.readFileSync('index.html', 'utf8');

  // Replace colors
  content = content.replace(/#f97316/gi, '#c9242b');
  content = content.replace(/#f59e0b/gi, '#c9242b');
  content = content.replace(/#ea580c/gi, '#a71d22');
  content = content.replace(/#d97706/gi, '#a71d22');

  // Fix mood-header
  content = content.replace(/\.mood-header\s*\{\s*text-align:\s*center;\s*margin-bottom:\s*4rem;\s*display:\s*none;\s*\/\*[\s\S]*?\*\/\s*\}/g, '.mood-header {\n      text-align: center;\n      margin-bottom: 4rem;\n    }');

  fs.writeFileSync('index.html', content, 'utf8');
  console.log('Successfully updated colors and header!');
} catch (e) {
  console.error('Error:', e);
}
