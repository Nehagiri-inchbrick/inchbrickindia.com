const fs = require('fs');

const files = ['index.html', 'projects.html', 'explore.html', 'contact.html'];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  
  let content = fs.readFileSync(file, 'utf8');
  const startStr = '<div class="voiceover-widget"';
  let startIdx = content.indexOf(startStr);
  
  while (startIdx !== -1) {
    const readyText = 'Ready to play voiceover.</p>';
    const readyIdx = content.indexOf(readyText, startIdx);
    
    if (readyIdx !== -1) {
       const endIdx = content.indexOf('</div>', readyIdx) + '</div>'.length;
       content = content.substring(0, startIdx) + content.substring(endIdx);
       console.log('Removed voiceover widget from', file);
    } else {
       console.log('Could not find end of voiceover widget in', file);
       break;
    }
    startIdx = content.indexOf(startStr);
  }
  
  fs.writeFileSync(file, content, 'utf8');
}
