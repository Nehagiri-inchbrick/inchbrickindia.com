const fs = require('fs');

const oldNav = `<nav class="nav-links" id="navLinks">
        <a href="index.html">Home</a>
        <a href="index.html#localities">Localities</a>
        <a href="projects.html">Projects</a>
        <a href="projects.html#liveStudio">Studio</a>
        <a href="explore.html">Explore</a>
        <a href="explore.html#why-choose">Why Us</a>
        <a href="explore.html#blog">Blog</a>
      </nav>`;

const newNav = `<nav class="nav-links" id="navLinks">
        <a href="index.html">Home</a>
        <a href="projects.html">Projects</a>
        <a href="explore.html">Explore</a>
        <a href="explore.html#blog">Blog</a>
        <a href="#">Contact</a>
      </nav>`;

const files = ['index.html', 'projects.html', 'explore.html'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(oldNav, newNav);
  
  // also handle potential formatting differences
  if (!content.includes(newNav)) {
    // If exact match fails, use substring between <nav ...> and </nav>
    const start = content.indexOf('<nav class="nav-links" id="navLinks">');
    if (start !== -1) {
      const end = content.indexOf('</nav>', start) + '</nav>'.length;
      content = content.substring(0, start) + newNav + content.substring(end);
    }
  }
  
  fs.writeFileSync(file, content, 'utf8');
}

console.log('Extra nav links removed.');
