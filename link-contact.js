const fs = require('fs');

const files = ['index.html', 'projects.html', 'explore.html'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/<a href="#">Contact<\/a>/g, '<a href="contact.html">Contact</a>');
  fs.writeFileSync(file, content, 'utf8');
}

console.log('Updated contact links in all files.');
