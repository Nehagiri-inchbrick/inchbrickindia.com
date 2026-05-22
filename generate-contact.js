const fs = require('fs');

const indexContent = fs.readFileSync('index.html', 'utf8');

const mainStart = indexContent.indexOf('<main>');
const mainEnd = indexContent.indexOf('</main>') + '</main>'.length;

if (mainStart === -1 || mainEnd === -1) {
  console.error("Could not find main tags in index.html");
  process.exit(1);
}

const headAndHeader = indexContent.substring(0, mainStart);
const footerAndScripts = indexContent.substring(mainEnd);

const contactMain = `<main class="contact-main">
  <section class="contact-section">
    <div class="container">
      <div class="contact-wrapper">
        
        <!-- Left Side: Contact Info -->
        <div class="contact-info-panel">
          <div class="bg-shape-1"></div>
          <div class="bg-shape-2"></div>
          
          <div class="info-content">
            <span class="kicker">GET IN TOUCH</span>
            <h1 class="info-title">Let's Create<br>Something <span>Amazing</span><br>Together!</h1>
            <p class="info-desc">Have a project in mind or just want to say hello?<br>We'd love to hear from you.</p>
            
            <div class="info-items">
              <div class="info-item">
                <div class="icon-wrap purple"><i class="fas fa-envelope"></i></div>
                <div class="item-text">
                  <strong>Email</strong>
                  <span>hello@inchbrickrealty.com</span>
                </div>
              </div>
              
              <div class="info-item">
                <div class="icon-wrap blue"><i class="fas fa-phone-alt"></i></div>
                <div class="item-text">
                  <strong>Phone</strong>
                  <span>+91 98765 43210</span>
                </div>
              </div>
              
              <div class="info-item">
                <div class="icon-wrap teal"><i class="fas fa-map-marker-alt"></i></div>
                <div class="item-text">
                  <strong>Location</strong>
                  <span>123 Innovation Drive, Tech City,<br>CA 94043, USA</span>
                </div>
              </div>
              
              <div class="info-item">
                <div class="icon-wrap orange"><i class="far fa-clock"></i></div>
                <div class="item-text">
                  <strong>Working Hours</strong>
                  <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="center-icon-wrap">
             <div class="center-icon"><i class="fas fa-paper-plane"></i></div>
          </div>
        </div>

        <!-- Right Side: Contact Form -->
        <div class="contact-form-panel">
          <div class="bg-dots-top"></div>
          <div class="bg-waves-bottom"></div>
          
          <div class="form-content">
            <h2 class="form-title">Send Us a Message</h2>
            
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
                <i class="far fa-bookmark input-icon"></i>
              </div>
              
              <div class="input-group">
                <textarea placeholder="Your Message" rows="5" required></textarea>
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
</main>`;

let contactHtml = headAndHeader + contactMain + footerAndScripts;

// Update the contact nav link to point to contact.html in contact.html
contactHtml = contactHtml.replace(/<a href="#">Contact<\/a>/g, '<a href="contact.html">Contact</a>');

// Inject the CSS for the contact page into the head of contact.html
const contactCSS = `
  /* Contact Page Styles */
  .contact-main {
    padding: 4rem 0;
    background: #f8fafc;
    min-height: calc(100vh - 80px);
    display: flex;
    align-items: center;
  }
  
  .contact-wrapper {
    display: grid;
    grid-template-columns: 1fr 1.3fr;
    background: #fff;
    border-radius: 24px;
    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
    overflow: hidden;
    position: relative;
    max-width: 1100px;
    margin: 0 auto;
  }
  
  .contact-info-panel {
    background: #0f172a;
    padding: 4rem 3.5rem;
    color: #fff;
    position: relative;
    overflow: hidden;
  }
  
  .bg-shape-1 {
    position: absolute;
    top: -10%;
    right: -10%;
    width: 300px;
    height: 300px;
    background: #3b82f6;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.4;
  }
  
  .bg-shape-2 {
    position: absolute;
    bottom: -10%;
    left: -10%;
    width: 300px;
    height: 300px;
    background: #8b5cf6;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.3;
  }
  
  .info-content {
    position: relative;
    z-index: 2;
  }
  
  .kicker {
    font-size: 0.75rem;
    font-weight: 700;
    color: #8b5cf6;
    letter-spacing: 2px;
    text-transform: uppercase;
    display: block;
    margin-bottom: 1rem;
  }
  
  .info-title {
    font-size: 2.5rem;
    line-height: 1.2;
    margin-bottom: 1.25rem;
    font-weight: 800;
  }
  
  .info-title span {
    color: #8b5cf6;
    position: relative;
  }
  
  .info-title span::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 100%;
    height: 4px;
    background: #8b5cf6;
    border-radius: 4px;
    opacity: 0.7;
  }
  
  .info-desc {
    color: #cbd5e1;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 3rem;
  }
  
  .info-items {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .info-item {
    display: flex;
    align-items: flex-start;
    gap: 1.25rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  
  .info-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  
  .icon-wrap {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
  }
  
  .icon-wrap.purple { background: #8b5cf6; color: #fff; }
  .icon-wrap.blue { background: #3b82f6; color: #fff; }
  .icon-wrap.teal { background: #14b8a6; color: #fff; }
  .icon-wrap.orange { background: #f59e0b; color: #fff; }
  
  .item-text strong {
    display: block;
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
    font-weight: 700;
  }
  
  .item-text span {
    color: #cbd5e1;
    font-size: 0.85rem;
    line-height: 1.5;
    display: block;
  }
  
  .center-icon-wrap {
    position: absolute;
    right: -30px;
    top: 40%;
    width: 90px;
    height: 90px;
    background: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
  
  .center-icon {
    width: 60px;
    height: 60px;
    background: #8b5cf6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.5rem;
    box-shadow: 0 10px 20px rgba(139, 92, 246, 0.4);
  }
  
  .contact-form-panel {
    padding: 4rem 4rem 4rem 5rem;
    position: relative;
    background: #fff;
  }
  
  .bg-dots-top {
    position: absolute;
    top: 2rem;
    right: 2rem;
    width: 100px;
    height: 100px;
    background-image: radial-gradient(#cbd5e1 2px, transparent 2px);
    background-size: 15px 15px;
    opacity: 0.5;
  }
  
  .form-content {
    position: relative;
    z-index: 2;
  }
  
  .form-title {
    font-size: 1.75rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 2.5rem;
    position: relative;
    display: inline-block;
  }
  
  .form-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 40px;
    height: 3px;
    background: #8b5cf6;
    border-radius: 2px;
  }
  
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  
  .input-group {
    position: relative;
  }
  
  .input-group input,
  .input-group textarea {
    width: 100%;
    background: #f8fafc;
    border: 1px solid transparent;
    border-radius: 12px;
    padding: 1.1rem 1.2rem 1.1rem 3rem;
    font-family: inherit;
    font-size: 0.95rem;
    color: #1e293b;
    transition: all 0.3s ease;
  }
  
  .input-group input:focus,
  .input-group textarea:focus {
    outline: none;
    border-color: #8b5cf6;
    background: #fff;
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.1);
  }
  
  .input-icon {
    position: absolute;
    left: 1.1rem;
    top: 1.25rem;
    color: #94a3b8;
    font-size: 1rem;
    pointer-events: none;
    transition: color 0.3s ease;
  }
  
  .input-group textarea ~ .input-icon {
    top: 1.2rem;
  }
  
  .input-group input:focus ~ .input-icon,
  .input-group textarea:focus ~ .input-icon {
    color: #8b5cf6;
  }
  
  .input-group textarea {
    resize: none;
    padding-top: 1.1rem;
  }
  
  .btn-submit {
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    color: #fff;
    border: none;
    padding: 1.1rem;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    transition: all 0.3s ease;
    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.25);
    margin-top: 0.5rem;
  }
  
  .btn-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 25px rgba(59, 130, 246, 0.35);
  }
  
  @media (max-width: 900px) {
    .contact-wrapper {
      grid-template-columns: 1fr;
    }
    .center-icon-wrap {
      display: none;
    }
    .contact-form-panel {
      padding: 3rem 2rem;
    }
    .contact-info-panel {
      padding: 3rem 2rem;
    }
  }
  
  @media (max-width: 600px) {
    .form-row {
      grid-template-columns: 1fr;
    }
    .info-title {
      font-size: 2rem;
    }
  }
  </style>
</head>`;

contactHtml = contactHtml.replace('</head>', contactCSS);

fs.writeFileSync('contact.html', contactHtml, 'utf8');
console.log('Created contact.html');
