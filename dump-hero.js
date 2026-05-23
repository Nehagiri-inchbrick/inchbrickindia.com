const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const start = content.indexOf('<section class="hero-jobstyle">');
const end = content.indexOf('</section>', start) + 10;
fs.writeFileSync('temp.txt', content.substring(start, end));
