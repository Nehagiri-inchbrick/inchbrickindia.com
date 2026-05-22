const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// --- 1. REPLACE CSS ---
const cssStartTarget = '<link href="https://fonts.googleapis.com/css2?family=Dancing+Script';
const cssStart = content.indexOf(cssStartTarget);
if (cssStart === -1) {
  console.error('Could not find CSS start target.');
  process.exit(1);
}

const cssEnd = content.indexOf('</style>', cssStart) + '</style>'.length;
if (cssEnd === -1) {
  console.error('Could not find CSS end target.');
  process.exit(1);
}

const newCSS = `<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Playball&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet">
<style>
/* ==========================================================================
   Ultra-Premium Hero Banner & Bottom Features Styles (Antigravity Design System)
   ========================================================================== */

:root {
  --navy-darkest: #070e17;
  --navy-dark: #0b1523;
  --navy-medium: #111f33;
  --gold-accent: #c39b62;
  --gold-light: #d4ae77;
  --gold-glow: rgba(195, 155, 98, 0.25);
  --white-clean: #ffffff;
  --gray-light: #f3f4f6;
  --gray-muted: #9ca3af;
}

/* Premium Hero Container Layout */
.hero-premium {
  position: relative;
  width: 100%;
  min-height: 820px;
  background: var(--navy-darkest);
  overflow: visible; /* let search bar overlap nicely */
  display: flex;
  color: var(--white-clean);
  font-family: "Plus Jakarta Sans", sans-serif;
  margin-bottom: 220px; /* space for search bar and proposition blocks */
}

/* Left Curved Panel */
.hero-left-panel {
  position: relative;
  width: 45%;
  background: var(--navy-dark);
  z-index: 3;
  padding: 8rem 2rem 8rem 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 10px 0 50px rgba(7, 14, 23, 0.3);
}

/* Curved Transition SVG */
.hero-transition-curve {
  position: absolute;
  top: 0;
  left: 44.9%; /* overlap 0.1% to prevent hairline gap */
  width: 18%;
  height: 100%;
  fill: var(--navy-dark);
  z-index: 2;
  pointer-events: none;
}

/* Right Visual Area */
.hero-right-visual {
  position: absolute;
  top: 0;
  right: 0;
  width: 56%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.luxury-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Left Side: Typography & Content */
.badge-discover {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  padding: 6px 18px;
  margin-bottom: 2.2rem;
  align-self: flex-start;
}

.badge-discover .badge-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 1px solid var(--gold-accent);
  border-radius: 6px;
  background: var(--gold-glow);
  color: var(--gold-accent);
  font-size: 11px;
}

.badge-discover .badge-text {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--white-clean);
}

.hero-title-main {
  font-family: "Playfair Display", serif;
  font-size: clamp(2.5rem, 4vw, 4.4rem);
  font-weight: 700;
  line-height: 1.05;
  color: var(--white-clean);
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
}

.hero-cursive-main {
  font-family: "Playball", "Dancing Script", cursive;
  font-size: clamp(2.5rem, 4vw, 3.8rem);
  color: var(--gold-accent);
  margin-bottom: 2rem;
  display: block;
}

.hero-description-main {
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--white-clean);
  opacity: 0.85;
  max-width: 440px;
  margin-bottom: 2.5rem;
}

/* Happy Buyers */
.happy-buyers-wrap {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 3rem;
}

.buyers-avatars-list {
  display: flex;
}

.buyers-avatars-list img {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 2px solid var(--navy-dark);
  margin-left: -12px;
  object-fit: cover;
}

.buyers-avatars-list img:first-child {
  margin-left: 0;
}

.buyers-stats-text {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}

.buyers-stats-text strong {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--white-clean);
}

.buyers-stats-text span {
  font-size: 0.88rem;
  color: var(--gold-accent);
  font-weight: 600;
}

/* Call to Actions & Note */
.hero-cta-wrapper {
  display: flex;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
}

.premium-watch-btn {
  background: var(--gold-accent);
  color: var(--navy-darkest);
  padding: 15px 32px;
  border-radius: 99px;
  font-weight: 700;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 8px 24px rgba(195, 155, 98, 0.2);
  text-decoration: none;
}

.premium-watch-btn:hover {
  background: var(--gold-light);
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(195, 155, 98, 0.35);
  color: var(--navy-darkest);
}

.video-helper-note {
  display: flex;
  align-items: center;
  gap: 14px;
}

.helper-arrow-svg {
  flex-shrink: 0;
}

.helper-note-text {
  font-family: "Dancing Script", cursive;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gold-accent);
  line-height: 1.1;
  white-space: nowrap;
}

/* Right Side: Floating Elements */
.floating-badge-verified {
  position: absolute;
  top: 40px;
  right: 40px;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(10px);
  border-radius: 18px;
  padding: 14px 22px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  z-index: 3;
  animation: floatEffect 4s ease-in-out infinite;
}

@keyframes floatEffect {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.verified-shield-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: rgba(195, 155, 98, 0.12);
  border-radius: 50%;
  color: var(--gold-accent);
  font-size: 20px;
}

.verified-badge-text h4 {
  font-size: 14px;
  font-weight: 800;
  color: var(--navy-darkest);
  margin: 0;
}

.verified-badge-text p {
  font-size: 11px;
  color: var(--gray-muted);
  margin: 2px 0 0 0;
  font-weight: 600;
}

/* Floating Featured Card */
.floating-featured-card {
  position: absolute;
  bottom: 120px;
  right: 40px;
  background: rgba(7, 14, 23, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 22px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
  z-index: 3;
  max-width: 440px;
  transition: border-color 0.3s ease;
}

.floating-featured-card:hover {
  border-color: rgba(195, 155, 98, 0.4);
}

.featured-card-left {
  display: flex;
  flex-direction: column;
}

.featured-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--gold-accent);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.featured-tag .square-bullet {
  width: 6px;
  height: 6px;
  background: var(--gold-accent);
  border-radius: 1px;
}

.featured-property-title {
  font-size: 19px;
  font-weight: 700;
  color: var(--white-clean);
  margin: 6px 0 4px 0;
  letter-spacing: -0.2px;
}

.featured-property-loc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 14px 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.featured-property-loc i {
  color: var(--gold-accent);
}

.featured-property-specs {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.featured-property-specs span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.featured-property-specs i {
  color: var(--gold-accent);
}

.featured-card-right {
  display: flex;
  align-items: center;
}

.featured-arrow-link {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--white-clean);
  color: var(--navy-darkest);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 6px 15px rgba(0,0,0,0.15);
}

.featured-arrow-link:hover {
  background: var(--gold-accent);
  color: var(--navy-darkest);
  transform: scale(1.1) rotate(-45deg);
  box-shadow: 0 8px 25px rgba(195,155,98,0.4);
}

/* Vertical Slider Indicator */
.vertical-slider-indicator {
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  z-index: 3;
}

.vertical-number {
  font-size: 12px;
  font-weight: 700;
  color: var(--white-clean);
  opacity: 0.85;
}

.vertical-dots-line {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.v-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  transition: all 0.3s ease;
  cursor: pointer;
}

.v-dot:hover {
  background: var(--white-clean);
}

.v-dot.active {
  background: var(--white-clean);
  transform: scale(1.3);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
}

/* Search Bar Wrapper & Bottom Elements */
.premium-bottom-bar-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  transform: translateY(60%); /* push it to overlap perfectly */
  z-index: 10;
}

/* Premium Floating Search Bar */
.premium-search-bar {
  background: rgba(246, 248, 250, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 100px;
  padding: 10px 12px 10px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
  width: 100%;
  max-width: 1020px;
  margin: 0 auto 24px;
}

.search-item {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.search-item-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-item-header .item-icon {
  font-size: 16px;
  color: var(--navy-medium);
  opacity: 0.85;
}

.search-field-input {
  width: 100%;
  background: transparent;
  border: none;
  font-size: 14px;
  color: var(--navy-darkest);
  outline: none;
  font-weight: 600;
  font-family: inherit;
}

.search-field-input::placeholder {
  color: #7c8ba1;
  font-weight: 500;
}

.search-field-select {
  width: 100%;
  background: transparent;
  border: none;
  font-size: 14px;
  color: var(--navy-darkest);
  outline: none;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  -webkit-appearance: none;
}

.search-bar-divider {
  width: 1px;
  height: 38px;
  background: rgba(0, 0, 0, 0.08);
  margin: 0 20px;
}

.search-action-btn {
  background: var(--navy-darkest);
  color: var(--white-clean);
  padding: 14px 34px;
  border-radius: 100px;
  font-weight: 700;
  border: none;
  font-size: 15px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.search-action-btn:hover {
  background: var(--gold-accent);
  color: var(--navy-darkest);
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(195, 155, 98, 0.3);
}

/* Premium Features Navy Block */
.premium-features-block {
  background: var(--navy-dark);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 24px 36px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 1020px;
  margin: 0 auto;
}

.feature-prop-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.feature-prop-circle {
  width: 44px;
  height: 44px;
  border: 1px solid var(--gold-accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gold-accent);
  font-size: 16px;
  background: var(--gold-glow);
  flex-shrink: 0;
}

.feature-prop-content h4 {
  font-size: 14px;
  font-weight: 700;
  color: var(--white-clean);
  margin: 0 0 4px 0;
  letter-spacing: 0.1px;
}

.feature-prop-content p {
  font-size: 11px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

/* Responsive Breakpoints */
@media (max-width: 1200px) {
  .hero-premium {
    min-height: 760px;
  }
  .hero-left-panel {
    padding-left: 3rem;
    width: 48%;
  }
  .hero-transition-curve {
    left: 47.9%;
    width: 20%;
  }
  .hero-right-visual {
    width: 53%;
  }
}

@media (max-width: 991px) {
  .hero-premium {
    flex-direction: column;
    min-height: auto;
    margin-bottom: 260px;
  }
  .hero-left-panel {
    width: 100%;
    padding: 6rem 3rem 6rem;
    box-shadow: none;
  }
  .hero-transition-curve {
    display: none;
  }
  .hero-right-visual {
    position: relative;
    width: 100%;
    height: 480px;
  }
  .floating-badge-verified {
    top: 30px;
    right: 30px;
  }
  .floating-featured-card {
    bottom: 30px;
    right: 30px;
    left: 30px;
    max-width: none;
  }
  .vertical-slider-indicator {
    display: none;
  }
  .premium-bottom-bar-wrap {
    transform: translateY(35%);
  }
  .premium-search-bar {
    flex-direction: column;
    border-radius: 30px;
    padding: 24px;
    gap: 16px;
    align-items: stretch;
  }
  .search-bar-divider {
    width: 100%;
    height: 1px;
    margin: 8px 0;
  }
  .search-action-btn {
    width: 100%;
    justify-content: center;
  }
  .premium-features-block {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 24px;
  }
}

@media (max-width: 640px) {
  .hero-left-panel {
    padding: 5rem 1.5rem 5rem;
  }
  .hero-title-main {
    font-size: 2.3rem;
  }
  .hero-cursive-main {
    font-size: 2rem;
  }
  .hero-description-main {
    font-size: 0.95rem;
  }
  .premium-watch-btn {
    width: 100%;
    justify-content: center;
  }
  .video-helper-note {
    width: 100%;
    justify-content: center;
  }
  .premium-features-block {
    grid-template-columns: 1fr;
  }
  .floating-badge-verified {
    padding: 10px 16px;
  }
  .floating-featured-card {
    flex-direction: column;
    gap: 20px;
    padding: 18px;
    align-items: stretch;
  }
  .featured-arrow-link {
    width: 100%;
    border-radius: 12px;
  }
  .premium-bottom-bar-wrap {
    transform: translateY(20%);
  }
}
</style>`;

let finalContent = content.substring(0, cssStart) + newCSS + content.substring(cssEnd);

// --- 2. REPLACE HTML ---
const htmlStartTarget = '<section class="hero-luxury">';
const htmlStart = finalContent.indexOf(htmlStartTarget);
if (htmlStart === -1) {
  console.error('Could not find HTML start target.');
  process.exit(1);
}

const htmlEnd = finalContent.indexOf('</section>', htmlStart) + '</section>'.length;
if (htmlEnd === -1) {
  console.error('Could not find HTML end target.');
  process.exit(1);
}

const newHTML = `<section class="hero-premium">
    <!-- Curved Left Panel for dark theme and typography -->
    <div class="hero-left-panel">
      
      <!-- Badges -->
      <div class="badge-discover">
        <span class="badge-icon"><i class="fa-solid fa-house-chimney"></i></span>
        <span class="badge-text">Discover Your Perfect Space</span>
      </div>

      <!-- Main Typography -->
      <h1 class="hero-title-main">Find More Than<br>Just a House.</h1>
      <span class="hero-cursive-main">Find Your Home.</span>
      
      <p class="hero-description-main">Handpicked properties that inspire, comfort that stays, and places you'll love to call home.</p>

      <!-- Social Proof / Happy Buyers -->
      <div class="happy-buyers-wrap">
        <div class="buyers-avatars-list">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Happy buyer">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Happy buyer">
          <img src="https://randomuser.me/api/portraits/men/86.jpg" alt="Happy buyer">
          <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Happy buyer">
        </div>
        <div class="buyers-stats-text">
          <strong>2,500+</strong>
          <span>Happy Buyers</span>
        </div>
      </div>

      <!-- Call to Actions -->
      <div class="hero-cta-wrapper">
        <a href="#" class="premium-watch-btn">
          <i class="fa-solid fa-play"></i> Watch Video
        </a>
        <div class="video-helper-note">
          <svg class="helper-arrow-svg" width="46" height="24" viewBox="0 0 46 24" fill="none">
            <path d="M2 18 C 15 28, 30 5, 42 12" stroke="#c39b62" stroke-width="1.5" stroke-linecap="round" fill="none" stroke-dasharray="1.5 1.5" />
            <path d="M36 7 L 42 12 L 37 18" stroke="#c39b62" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          </svg>
          <span class="helper-note-text">See how we help you find the one.</span>
        </div>
      </div>

    </div>

    <!-- Curved Transition SVG -->
    <svg class="hero-transition-curve" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d="M0,0 L100,0 C80,30 40,75 0,100 Z" />
    </svg>

    <!-- Right Side Content -->
    <div class="hero-right-visual">
      <!-- Background Luxury House Image -->
      <img src="modern_luxury_house.png" class="luxury-hero-img" alt="Modern Luxury Villa">
      
      <!-- Top Right Floating Shield Badge -->
      <div class="floating-badge-verified">
        <div class="verified-shield-icon">
          <i class="fa-regular fa-star"></i>
        </div>
        <div class="verified-badge-text">
          <h4>Premium Homes</h4>
          <p>Verified & Trusted</p>
        </div>
      </div>

      <!-- Bottom Right Floating Property Card -->
      <div class="floating-featured-card">
        <div class="featured-card-left">
          <div class="featured-tag">
            <span class="square-bullet"></span> FEATURED PROPERTY
          </div>
          <h3 class="featured-property-title">Modern Luxury Villa</h3>
          <p class="featured-property-loc"><i class="fa-solid fa-location-dot"></i> Beverly Hills, CA</p>
          <div class="featured-property-specs">
            <span><i class="fa-solid fa-bed"></i> 5 Beds</span>
            <span><i class="fa-solid fa-bath"></i> 6 Baths</span>
            <span><i class="fa-solid fa-ruler-combined"></i> 4,820 sqft</span>
          </div>
        </div>
        <div class="featured-card-right">
          <a href="#" class="featured-arrow-link"><i class="fa-solid fa-arrow-right"></i></a>
        </div>
      </div>

      <!-- Vertical Slider Indicators -->
      <div class="vertical-slider-indicator">
        <span class="vertical-number">01</span>
        <div class="vertical-dots-line">
          <span class="v-dot active"></span>
          <span class="v-dot"></span>
          <span class="v-dot"></span>
          <span class="v-dot"></span>
        </div>
      </div>

    </div>

  </section>

  <!-- Bottom Search Bar and Value Propositions Strip container -->
  <div class="premium-bottom-bar-wrap">
    <div class="container">
      
      <!-- Overlapping Search Bar -->
      <div class="premium-search-bar">
        <div class="search-item">
          <div class="search-item-header">
            <i class="fa-solid fa-location-dot item-icon"></i>
            <input type="text" placeholder="Enter locality / project / builder" class="search-field-input" id="search-locality">
          </div>
        </div>
        
        <div class="search-bar-divider"></div>
        
        <div class="search-item">
          <div class="search-item-header">
            <i class="fa-solid fa-house item-icon"></i>
            <select class="search-field-select" id="search-type">
              <option value="" disabled selected>Select property type</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="plot">Plot</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
        </div>
        
        <div class="search-bar-divider"></div>
        
        <div class="search-item">
          <div class="search-item-header">
            <i class="fa-solid fa-city item-icon"></i>
            <input type="text" placeholder="Enter city" class="search-field-input" id="search-city">
          </div>
        </div>
        
        <button class="search-action-btn" onclick="performPremiumSearch()">
          <i class="fa-solid fa-magnifying-glass"></i> Search
        </button>
      </div>

      <!-- Bottom Navy Blue Value Proposition Block -->
      <div class="premium-features-block">
        
        <div class="feature-prop-item">
          <div class="feature-prop-circle">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          <div class="feature-prop-content">
            <h4>Verified Listings</h4>
            <p>Every property is verified for your peace of mind.</p>
          </div>
        </div>

        <div class="feature-prop-item">
          <div class="feature-prop-circle">
            <i class="fa-solid fa-location-dot"></i>
          </div>
          <div class="feature-prop-content">
            <h4>Prime Locations</h4>
            <p>Explore homes in the most desirable neighborhoods.</p>
          </div>
        </div>

        <div class="feature-prop-item">
          <div class="feature-prop-circle">
            <i class="fa-solid fa-handshake-simple"></i>
          </div>
          <div class="feature-prop-content">
            <h4>Expert Support</h4>
            <p>We're here to help you, anytime, anywhere.</p>
          </div>
        </div>

        <div class="feature-prop-item">
          <div class="feature-prop-circle">
            <i class="fa-solid fa-tag"></i>
          </div>
          <div class="feature-prop-content">
            <h4>Best Price Guarantee</h4>
            <p>Get the best value for your dream home.</p>
          </div>
        </div>

      </div>

    </div>
  </div>`;

finalContent = finalContent.substring(0, htmlStart) + newHTML + finalContent.substring(htmlEnd);

// --- 3. ADD JAVASCRIPT SEARCH FUNCTION ---
// Insert JavaScript performPremiumSearch function before </body>
const bodyEnd = finalContent.indexOf('</body>');
if (bodyEnd !== -1) {
  const searchScript = `
  <script>
    function performPremiumSearch() {
      const locality = document.getElementById('search-locality').value;
      const type = document.getElementById('search-type').value;
      const city = document.getElementById('search-city').value;
      
      console.log('Search Triggered:', { locality, type, city });
      
      // Slick feedback
      const alertDiv = document.createElement('div');
      alertDiv.style.position = 'fixed';
      alertDiv.style.bottom = '30px';
      alertDiv.style.right = '30px';
      alertDiv.style.background = '#0b1523';
      alertDiv.style.color = '#fff';
      alertDiv.style.border = '1px solid #c39b62';
      alertDiv.style.borderRadius = '12px';
      alertDiv.style.padding = '16px 24px';
      alertDiv.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
      alertDiv.style.zIndex = '10001';
      alertDiv.style.fontFamily = '"Plus Jakarta Sans", sans-serif';
      alertDiv.style.fontSize = '14px';
      alertDiv.style.display = 'flex';
      alertDiv.style.alignItems = 'center';
      alertDiv.style.gap = '10px';
      alertDiv.style.transition = 'all 0.5s ease';
      
      alertDiv.innerHTML = \`<i class="fa-solid fa-circle-check" style="color: #c39b62; font-size: 18px;"></i> Searching for \${type || 'properties'} in \${locality || 'any locality'}\${city ? ', ' + city : ''}...\`;
      
      document.body.appendChild(alertDiv);
      
      // Smooth scroll to localities or homes-picked-section
      setTimeout(() => {
        alertDiv.style.opacity = '0';
        alertDiv.style.transform = 'translateY(20px)';
        setTimeout(() => alertDiv.remove(), 500);
      }, 3000);
      
      const targetSection = document.getElementById('localities') || document.querySelector('.homes-picked-section');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  </script>
  `;
  finalContent = finalContent.substring(0, bodyEnd) + searchScript + finalContent.substring(bodyEnd);
}

fs.writeFileSync('index.html', finalContent, 'utf8');
console.log('Successfully replaced old hero block and CSS in index.html');
