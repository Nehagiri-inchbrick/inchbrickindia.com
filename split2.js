const fs = require('fs');

const indexContent = fs.readFileSync('index.html', 'utf8');
const lines = indexContent.split('\n');

let splitStartIndex = -1;
let footerStartIndex = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('<section class="community-city-section"')) {
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

let mainStartIndex = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('<main>')) {
    mainStartIndex = i;
    break;
  }
}

let topPart = lines.slice(0, mainStartIndex + 1).join('\n');
topPart = topPart.replace(
  '<a href="#">Projects</a>',
  '<a href="projects.html">Projects</a>'
);

let indexBottom = lines.slice(footerStartIndex).join('\n');
indexBottom = indexBottom.replace(
  '<a href="#">Projects</a>',
  '<a href="projects.html">Projects</a>'
);

let newIndexContent = topPart + '\n' + lines.slice(mainStartIndex + 1, splitStartIndex).join('\n') + '\n' + indexBottom;
let projectsContent = topPart + '\n' + lines.slice(splitStartIndex, footerStartIndex).join('\n') + '\n' + indexBottom;

fs.writeFileSync('index.html', newIndexContent, 'utf8');
fs.writeFileSync('projects.html', projectsContent, 'utf8');

// Update explore.html too
const exploreContent = fs.readFileSync('explore.html', 'utf8');
const newExploreContent = exploreContent.replace(
  /<a href="#">Projects<\/a>/g,
  '<a href="projects.html">Projects</a>'
);
fs.writeFileSync('explore.html', newExploreContent, 'utf8');

console.log('Split 2 successful!');
