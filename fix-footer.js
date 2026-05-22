const fs = require('fs');

const files = ['index.html', 'projects.html', 'explore.html'];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  
  // Find footer start
  const footerStart = content.indexOf('<footer class="site-footer"');
  if (footerStart === -1) {
    console.log(`Could not find footer in ${file}`);
    continue;
  }
  
  // Find footer end
  const footerEndStr = '</footer>';
  let footerEnd = content.indexOf(footerEndStr, footerStart);
  if (footerEnd === -1) {
    console.log(`Could not find </footer> in ${file}`);
    continue;
  }
  footerEnd += footerEndStr.length;
  
  // Find </main>
  const mainEnd = content.indexOf('</main>', footerEnd);
  
  if (mainEnd !== -1) {
    // Check if there is anything between </footer> and </main> except whitespace/scripts
    const betweenContent = content.substring(footerEnd, mainEnd);
    
    // If there are <section> tags in betweenContent, move them before footerStart
    if (betweenContent.includes('<section')) {
      const partsToMove = betweenContent;
      
      // We will remove the partsToMove from its current position
      // And insert it before footerStart
      let newContent = content.substring(0, footerStart) 
                     + partsToMove 
                     + content.substring(footerStart, footerEnd)
                     + content.substring(mainEnd);
                     
      fs.writeFileSync(file, newContent, 'utf8');
      console.log(`Fixed sections after footer in ${file}`);
    } else {
      console.log(`No misplaced sections in ${file}`);
    }
  } else {
    console.log(`Could not find </main> after footer in ${file}`);
  }
}
