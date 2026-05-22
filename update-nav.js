const fs = require('fs');

const navReplacement = `<nav class="nav-links" id="navLinks">
        <a href="index.html">Home</a>
        <a href="index.html#localities">Localities</a>
        <a href="projects.html">Projects</a>
        <a href="projects.html#liveStudio">Studio</a>
        <a href="explore.html">Explore</a>
        <a href="explore.html#why-choose">Why Us</a>
        <a href="explore.html#blog">Blog</a>
      </nav>`;

function replaceNav(content) {
  const start = content.indexOf('<nav class="nav-links" id="navLinks">');
  const end = content.indexOf('</nav>', start) + '</nav>'.length;
  if (start === -1 || end === -1) return content;
  return content.substring(0, start) + navReplacement + content.substring(end);
}

// 1. Process index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = replaceNav(indexHtml);
indexHtml = indexHtml.replace('<section class="location-slider-section">', '<section class="location-slider-section" id="localities">');
fs.writeFileSync('index.html', indexHtml, 'utf8');

// 2. Process projects.html
let projectsHtml = fs.readFileSync('projects.html', 'utf8');
projectsHtml = replaceNav(projectsHtml);
// it already has liveStudio id
fs.writeFileSync('projects.html', projectsHtml, 'utf8');

// 3. Process explore.html
let exploreHtml = fs.readFileSync('explore.html', 'utf8');
exploreHtml = replaceNav(exploreHtml);
exploreHtml = exploreHtml.replace('<section class="why-choose-section">', '<section class="why-choose-section" id="why-choose">');
exploreHtml = exploreHtml.replace('<section class="blog-section">', '<section class="blog-section" id="blog">');
fs.writeFileSync('explore.html', exploreHtml, 'utf8');

console.log('Navbar updated in all files.');
