const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');

const heroStart = content.indexOf('<section class="hero-jobstyle">');
const heroEnd = content.indexOf('</section>', heroStart) + '</section>'.length;

if (heroStart === -1 || heroEnd === -1) {
  console.error('Could not find hero section');
  process.exit(1);
}

const searchBarStart = content.indexOf('<div class="search-bar-container">', heroStart);
const searchBarEnd = content.indexOf('</div>\n\n        <div class="quick-filters-container">', searchBarStart);
const searchBarHTML = content.substring(searchBarStart, searchBarEnd + 6); // + 6 for </div>

// We also have quick filters. We can put them inside the search bar wrapper or just omit them?
// The user said "add search bar like currently in banner". They might want the filters too, or just the search bar.
// Let's include the quick filters right below the search bar.
const filtersStart = content.indexOf('<div class="quick-filters-container">', heroStart);
let filtersEnd = content.indexOf('</div>', content.indexOf('<div class="quick-filters-container row-2">', filtersStart)) + 6;
// actually the row-2 ends, then the container ends. Let's just find the end of hero.
// I'll grab both and place them beautifully.

const newHeroHTML = `<section class="hero-luxury">
  <div class="hero-bg-image"></div>
  <div class="play-btn-overlay"><i class="fas fa-play" style="margin-left: 5px;"></i></div>
  
  <div class="hero-luxury-content">
    <div class="hero-left-col">
      <h1>Find More Than<br>Just a House.</h1>
      <span class="cursive-text">Find Your Home.</span>
      <p class="hero-desc">Discover spaces that inspire,<br>comfort that stays, and places<br>you'll love to call home.</p>
      
      <div class="happy-buyers">
        <div class="buyer-avatars">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Buyer">
          <img src="https://randomuser.me/api/portraits/men/44.jpg" alt="Buyer">
          <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Buyer">
          <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="Buyer">
        </div>
        <div class="buyers-text">
          <strong>2,500+</strong>
          Happy Buyers
        </div>
      </div>
      
      <a href="#" class="watch-video-btn">
        Watch Video
        <div class="icon-circle"><i class="fas fa-chevron-right"></i></div>
      </a>
    </div>
  </div>

  <div class="search-bar-wrapper">
    <div class="search-bar-inner">
      ${searchBarHTML}
    </div>
  </div>
</section>`;

const newCSS = `
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet">
<style>
/* Luxury Hero Banner Styles */
.hero-luxury {
  position: relative;
  width: 100%;
  min-height: 80vh;
  display: flex;
  align-items: center;
  background: #0b111e; /* dark navy */
  overflow: visible;
  padding-top: 80px;
  padding-bottom: 140px; /* space for absolute search bar */
  margin-bottom: 80px; /* push down subsequent content */
}

.hero-bg-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 65%;
  height: 100%;
  background: url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat;
  -webkit-mask-image: linear-gradient(to right, transparent, black 40%);
  mask-image: linear-gradient(to right, transparent, black 40%);
  z-index: 1;
}

.play-btn-overlay {
  position: absolute;
  top: 50%;
  right: 25%;
  transform: translate(50%, -50%);
  width: 90px;
  height: 90px;
  border: 4px solid rgba(255,255,255,0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 2rem;
  z-index: 3;
  cursor: pointer;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(5px);
  transition: transform 0.3s ease;
}

.play-btn-overlay:hover {
  transform: translate(50%, -50%) scale(1.1);
  background: rgba(255,255,255,0.25);
}

.hero-luxury-content {
  position: relative;
  z-index: 4;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-left-col {
  max-width: 500px;
  color: #fff;
}

.hero-left-col h1 {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 0.5rem;
}

.hero-left-col .cursive-text {
  font-family: 'Dancing Script', cursive;
  font-size: 3.5rem;
  color: #f7a956; /* golden orange */
  margin-bottom: 1.5rem;
  display: block;
}

.hero-left-col .hero-desc {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #cbd5e1;
  margin-bottom: 2.5rem;
}

.happy-buyers {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.buyer-avatars {
  display: flex;
}

.buyer-avatars img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid #0b111e;
  margin-left: -15px;
  object-fit: cover;
}
.buyer-avatars img:first-child { margin-left: 0; }

.buyers-text {
  font-size: 0.9rem;
  line-height: 1.3;
  color: #cbd5e1;
}
.buyers-text strong {
  display: block;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
}

.watch-video-btn {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  color: #0b111e;
  padding: 6px 6px 6px 24px;
  border-radius: 40px;
  font-weight: 700;
  text-decoration: none;
  width: 220px;
  transition: transform 0.3s ease;
  font-size: 1rem;
}
.watch-video-btn:hover {
  transform: translateY(-2px);
}
.watch-video-btn .icon-circle {
  width: 40px;
  height: 40px;
  background: #3f4e64;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.9rem;
}

/* Search bar overlapping position */
.search-bar-wrapper {
  position: absolute;
  bottom: -40px;
  left: 0;
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  padding: 0 20px;
}

.search-bar-inner {
  width: 100%;
  max-width: 1000px;
}

/* Ensure the search bar itself looks good overlapping */
.search-bar-inner .search-bar-container {
  margin-top: 0; 
}
.search-bar-inner .search-bar-jobstyle {
  box-shadow: 0 20px 40px rgba(0,0,0,0.15); /* stronger shadow for overlap */
}

@media (max-width: 900px) {
  .hero-bg-image {
    width: 100%;
    -webkit-mask-image: linear-gradient(to top, transparent, black 70%);
    mask-image: linear-gradient(to top, transparent, black 70%);
    opacity: 0.4;
  }
  .play-btn-overlay {
    top: 20%;
    right: 50%;
    transform: translate(50%, -50%);
  }
  .hero-left-col h1 { font-size: 2.8rem; }
  .hero-left-col .cursive-text { font-size: 2.8rem; }
  .search-bar-wrapper {
    position: relative;
    bottom: 0;
    margin-top: 40px;
  }
  .hero-luxury {
    padding-bottom: 40px;
    margin-bottom: 40px;
    display: block; /* stack layout */
  }
}
</style>
`;

let finalHTML = content.substring(0, heroStart) + newHeroHTML + content.substring(heroEnd);

// inject CSS in head
finalHTML = finalHTML.replace('</head>', newCSS + '\n</head>');

fs.writeFileSync('index.html', finalHTML, 'utf8');
console.log('Successfully updated hero section.');
