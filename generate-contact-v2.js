const fs = require('fs');

const indexContent = fs.readFileSync('index.html', 'utf8');

const mainStartIdx = indexContent.indexOf('<main>');
const footerStartIdx = indexContent.indexOf('<footer class="site-footer">');
const footerEndIdx = indexContent.indexOf('</footer>') + '</footer>'.length;
const mainEndIdx = indexContent.indexOf('</main>', footerEndIdx) + '</main>'.length;

let headAndHeader = indexContent.substring(0, mainStartIdx);
let footer = indexContent.substring(footerStartIdx, footerEndIdx);
let scriptsEnd = indexContent.substring(mainEndIdx);

const contactMainStr = `<main class="contact-main">
  <section class="contact-section">
    <div class="container">
      <div class="contact-wrapper">
        
        <!-- Background elements -->
        <div class="bg-dots-left"></div>
        <div class="blue-slash-wrap">
          <svg class="blue-slash-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M25,0 C35,0 40,20 15,100 L100,100 L100,0 Z" fill="#0052cc" />
          </svg>
          <div class="slash-image"></div>
        </div>

        <!-- Left Side: Contact Info -->
        <div class="contact-info-panel">
          <div class="info-content">
            <span class="kicker">GET IN TOUCH</span>
            <h1 class="info-title">Let's Work<br><span>Together</span></h1>
            
            <div class="title-line"></div>
            
            <p class="info-desc">Have a project in mind or just want to say hello? We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.</p>
            
            <div class="info-items">
              <div class="info-item">
                <div class="icon-wrap"><i class="fas fa-envelope"></i></div>
                <div class="item-text">
                  <strong>Email</strong>
                  <span>hello@inchbrickrealty.com</span>
                </div>
              </div>
              
              <div class="info-item">
                <div class="icon-wrap"><i class="fas fa-phone-alt"></i></div>
                <div class="item-text">
                  <strong>Phone</strong>
                  <span>+1 (123) 456-7890</span>
                </div>
              </div>
              
              <div class="info-item">
                <div class="icon-wrap"><i class="fas fa-map-marker-alt"></i></div>
                <div class="item-text">
                  <strong>Location</strong>
                  <span>123 Innovation Drive,<br>Tech City, CA 94043, USA</span>
                </div>
              </div>
              
              <div class="info-item">
                <div class="icon-wrap"><i class="far fa-clock"></i></div>
                <div class="item-text">
                  <strong>Working Hours</strong>
                  <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side: Contact Form -->
        <div class="contact-form-panel">
          <div class="form-content">
            <h2 class="form-title">Send Us a <span>Message</span></h2>
            <div class="form-underline"></div>
            
            <form class="contact-form" onsubmit="event.preventDefault();">
              <div class="form-row">
                <div class="input-group">
                  <input type="text" placeholder="Your Name" required>
                  <i class="far fa-user input-icon"></i>
                </div>
                <div class="input-group">
                  <input type="email" placeholder="Your Email" required>
                  <i class="far fa-envelope input-icon"></i>
                </div>
              </div>
              
              <div class="input-group">
                <input type="text" placeholder="Subject" required>
                <i class="fas fa-tag input-icon"></i>
              </div>
              
              <div class="input-group">
                <textarea placeholder="Your Message" rows="6" required></textarea>
                <i class="fas fa-pencil-alt input-icon"></i>
              </div>
              
              <button type="submit" class="btn-submit">
                Send Message <i class="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
        
      </div>
    </div>
  </section>

  <!-- Append the footer inside main just like index.html -->
  \n${footer}\n
</main>`;

let newContactHtml = headAndHeader + contactMainStr + scriptsEnd;
newContactHtml = newContactHtml.replace(/<a href="#">Contact<\/a>/g, '<a href="contact.html">Contact</a>');

const contactCSS = `
<style>
  /* Modern Light Contact Page Styles */
  .contact-main {
    padding: 6rem 1.5rem 4rem;
    background: #f0f4f8;
    min-height: calc(100vh - 80px);
  }
  
  .contact-wrapper {
    display: grid;
    grid-template-columns: 1fr 1.3fr;
    background: #f8fafc;
    border-radius: 24px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
    position: relative;
    max-width: 1100px;
    margin: 0 auto 4rem auto;
    overflow: hidden;
  }
  
  /* Background Elements */
  .bg-dots-left {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    width: 100px;
    height: 100px;
    background-image: radial-gradient(#cbd5e1 2px, transparent 2px);
    background-size: 15px 15px;
    opacity: 0.8;
    z-index: 0;
  }

  .blue-slash-wrap {
    position: absolute;
    top: 0;
    right: 0;
    width: 65%;
    height: 100%;
    z-index: 1;
    overflow: hidden;
  }

  .blue-slash-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .slash-image {
    position: absolute;
    top: 0;
    left: 15%; /* align with the SVG curve roughly */
    right: 0;
    bottom: 0;
    background: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80') center/cover;
    mix-blend-mode: multiply;
    opacity: 0.3;
    pointer-events: none;
    clip-path: polygon(15% 0, 100% 0, 100% 100%, -10% 100%);
  }
  
  /* Left Panel */
  .contact-info-panel {
    padding: 4rem 3rem 4rem 4rem;
    position: relative;
    z-index: 2;
  }
  
  .kicker {
    font-size: 0.75rem;
    font-weight: 700;
    color: #0052cc;
    letter-spacing: 2px;
    text-transform: uppercase;
    display: block;
    margin-bottom: 0.8rem;
  }
  
  .info-title {
    font-size: 3rem;
    line-height: 1.1;
    margin-bottom: 1rem;
    font-weight: 800;
    color: #0f172a;
  }
  
  .info-title span {
    color: #0052cc;
  }
  
  .title-line {
    width: 40px;
    height: 3px;
    background: #0052cc;
    margin-bottom: 1.5rem;
    border-radius: 2px;
  }
  
  .info-desc {
    color: #64748b;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 2.5rem;
    max-width: 90%;
  }
  
  .info-items {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .info-item {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }
  
  .icon-wrap {
    width: 50px;
    height: 50px;
    background: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    color: #0052cc;
    flex-shrink: 0;
    box-shadow: 0 8px 20px rgba(0, 82, 204, 0.1);
  }
  
  .item-text strong {
    display: block;
    font-size: 0.9rem;
    margin-bottom: 0.2rem;
    font-weight: 700;
    color: #1e293b;
  }
  
  .item-text span {
    color: #64748b;
    font-size: 0.85rem;
    line-height: 1.4;
    display: block;
  }
  
  /* Right Panel */
  .contact-form-panel {
    padding: 3rem;
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
  }
  
  .form-content {
    background: #fff;
    border-radius: 16px;
    padding: 3.5rem 3rem;
    width: 100%;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
  }
  
  .form-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.5rem;
  }
  
  .form-title span {
    color: #0052cc;
  }
  
  .form-underline {
    width: 40px;
    height: 3px;
    background: #3b82f6; /* slightly lighter blue for the underline */
    border-radius: 2px;
    margin-bottom: 2rem;
  }
  
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem;
  }
  
  .input-group {
    position: relative;
  }
  
  .input-group input,
  .input-group textarea {
    width: 100%;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1rem 1rem 1rem 3rem;
    font-family: inherit;
    font-size: 0.9rem;
    color: #334155;
    transition: all 0.3s ease;
  }
  
  .input-group input::placeholder,
  .input-group textarea::placeholder {
    color: #94a3b8;
  }
  
  .input-group input:focus,
  .input-group textarea:focus {
    outline: none;
    border-color: #0052cc;
    box-shadow: 0 0 0 3px rgba(0, 82, 204, 0.1);
  }
  
  .input-icon {
    position: absolute;
    left: 1.1rem;
    top: 1.15rem;
    color: #94a3b8;
    font-size: 0.95rem;
    pointer-events: none;
    transition: color 0.3s ease;
  }
  
  .input-group textarea ~ .input-icon {
    top: 1.2rem;
  }
  
  .input-group input:focus ~ .input-icon,
  .input-group textarea:focus ~ .input-icon {
    color: #0052cc;
  }
  
  .input-group textarea {
    resize: none;
    padding-top: 1.1rem;
  }
  
  .btn-submit {
    background: #0066ff;
    color: #fff;
    border: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    transition: all 0.3s ease;
    box-shadow: 0 6px 15px rgba(0, 102, 255, 0.25);
    margin-top: 0.5rem;
    align-self: flex-start; /* align button to left */
  }
  
  .btn-submit:hover {
    background: #0052cc;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 102, 255, 0.3);
  }
  
  @media (max-width: 900px) {
    .contact-wrapper {
      grid-template-columns: 1fr;
    }
    .blue-slash-wrap {
      display: none; /* Hide complex slash on mobile */
    }
    .contact-form-panel {
      padding: 0 2rem 3rem 2rem;
    }
    .contact-info-panel {
      padding: 3rem 2rem 2rem 2rem;
    }
    .form-content {
      padding: 2.5rem 2rem;
    }
  }
  
  @media (max-width: 600px) {
    .form-row {
      grid-template-columns: 1fr;
    }
    .info-title {
      font-size: 2.2rem;
    }
  }
</style>
</head>`;

newContactHtml = newContactHtml.replace('</head>', contactCSS);

fs.writeFileSync('contact.html', newContactHtml, 'utf8');
console.log('Updated contact.html with new light design.');
