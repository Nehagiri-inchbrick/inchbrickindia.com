const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const heroStart = content.indexOf('<section class="hero-luxury">');
if (heroStart === -1) {
  console.log('Could not find hero-luxury');
  fs.writeFileSync('hero-section.txt', 'Not found');
  process.exit(0);
}

const nextSection = content.indexOf('<section', heroStart + 1);
const heroEnd = content.lastIndexOf('</section>', nextSection);
const end = heroEnd !== -1 ? heroEnd + 10 : content.indexOf('</section>', heroStart) + 10;

const sectionHTML = content.substring(heroStart, end);
const lines = content.substring(0, heroStart).split('\n').length;
const endLines = content.substring(0, end).split('\n').length;

fs.writeFileSync('hero-section.txt', `Lines: ${lines} to ${endLines}\n\n${sectionHTML}`);
console.log(`Saved hero section (lines ${lines} to ${endLines}) to hero-section.txt`);
