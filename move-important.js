const fs = require('fs');

function extractSection(content, sectionClass) {
  const lines = content.split('\n');
  let inSection = false;
  let sectionLines = [];
  let openDivs = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (!inSection && line.includes(`<section class="${sectionClass}"`)) {
      inSection = true;
    }
    
    if (inSection) {
      sectionLines.push(line);
      
      // Basic tag counting to find end of section
      // This is a naive approach, let's instead rely on the next <section> tag or </main> or <footer>
      // Actually, since sections are top level, it ends right before the next <section> or </main> or <footer
      if (sectionLines.length > 1 && (line.trim().startsWith('<section') || line.includes('<footer') || line.includes('</main>'))) {
        sectionLines.pop(); // remove the tag that started the next section
        break;
      }
    }
  }
  return sectionLines.join('\n');
}

// Read contents
const indexContent = fs.readFileSync('index.html', 'utf8');
const projectsContent = fs.readFileSync('projects.html', 'utf8');
const exploreContent = fs.readFileSync('explore.html', 'utf8');

// Extract sections
const developersSection = extractSection(projectsContent, 'developers-projects');
const reviewsSection = extractSection(projectsContent, 'reviews-video-section');
const whyChooseSection = extractSection(exploreContent, 'why-choose-section');
const socialProofSection = extractSection(projectsContent, 'social-proof');

// Now we want to remove these sections from their original files
function removeSection(content, sectionClass) {
  const extracted = extractSection(content, sectionClass);
  if (extracted) {
    return content.replace(extracted, '');
  }
  return content;
}

let newProjectsContent = removeSection(projectsContent, 'developers-projects');
newProjectsContent = removeSection(newProjectsContent, 'reviews-video-section');
newProjectsContent = removeSection(newProjectsContent, 'social-proof');

let newExploreContent = removeSection(exploreContent, 'why-choose-section');

// Append to index.html before </main>
const insertPos = indexContent.indexOf('</main>');
if (insertPos !== -1) {
  let toInsert = '\n' + developersSection + '\n' + socialProofSection + '\n' + reviewsSection + '\n' + whyChooseSection + '\n';
  let newIndexContent = indexContent.slice(0, insertPos) + toInsert + indexContent.slice(insertPos);
  
  fs.writeFileSync('index.html', newIndexContent, 'utf8');
  fs.writeFileSync('projects.html', newProjectsContent, 'utf8');
  fs.writeFileSync('explore.html', newExploreContent, 'utf8');
  console.log('Sections moved to index.html successfully!');
} else {
  console.log('Could not find </main> in index.html');
}
