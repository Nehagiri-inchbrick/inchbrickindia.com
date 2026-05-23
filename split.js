const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

let splitStartIndex = -1;
let footerStartIndex = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('<section class="why-choose-section">')) {
    splitStartIndex = i;
  }
  if (lines[i].includes('<footer') && i > splitStartIndex) {
    footerStartIndex = i;
    break;
  }
}

if (splitStartIndex === -1 || footerStartIndex === -1) {
  console.error("Could not find section boundaries", splitStartIndex, footerStartIndex);
  process.exit(1);
}

// We need to keep <main> in indexTop, and close it in indexBottom if necessary.
let mainStartIndex = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('<main>')) {
    mainStartIndex = i;
    break;
  }
}

let topPart = lines.slice(0, mainStartIndex + 1).join('\n');
// Ensure only ONE Explore More is added if ran multiple times
if (!topPart.includes('Explore More')) {
    topPart = topPart.replace(
      '</nav>',
      '  <a href="explore.html">Explore More</a>\n      </nav>'
    );
}
topPart = topPart.replace(
  '<a href="#">Buy</a>',
  '<a href="index.html">Buy</a>'
);

let indexBottom = lines.slice(footerStartIndex).join('\n');
if (!indexBottom.includes('Explore More')) {
    indexBottom = indexBottom.replace(
      '</nav>',
      '  <a href="explore.html">Explore More</a>\n      </nav>'
    );
}

let indexContent = topPart + '\n' + lines.slice(mainStartIndex + 1, splitStartIndex).join('\n') + '\n' + indexBottom;

let exploreContent = topPart + '\n' + lines.slice(splitStartIndex, footerStartIndex).join('\n') + '\n' + indexBottom;

fs.writeFileSync('index.html', indexContent, 'utf8');
fs.writeFileSync('explore.html', exploreContent, 'utf8');

console.log('Split successful!');
