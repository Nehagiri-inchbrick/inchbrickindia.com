const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const headEnd = content.indexOf('</head>');
const headPrev = content.substring(headEnd - 2000, headEnd);
fs.writeFileSync('head-end.txt', headPrev);
console.log('Saved last 2000 chars of head to head-end.txt');
