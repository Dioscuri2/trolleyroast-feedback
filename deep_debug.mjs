import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  const errors = [];
  const logs = [];

  page.on('pageerror', err => {
    console.error('RUNTIME ERROR:', err.message);
    errors.push(err.message);
  });
  
  page.on('console', msg => {
    console.log('BROWSER LOG:', msg.text());
    logs.push(msg.text());
  });

  console.log("Attempting to render live deployment...");
  try {
    // Testing the specific deployment URL we just pushed
    await page.goto('https://trolleyroast-frontend-repo-mi016mpbm.vercel.app/', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    const content = await page.content();
    if (content.includes('root') && content.length < 500) {
      console.log("CRITICAL: Page is empty (white screen of death).");
    } else {
      console.log("Page content length:", content.length);
    }
  } catch (err) {
    console.error("Navigation failed:", err.message);
  }

  await browser.close();
  
  if (errors.length > 0) {
    console.log("\nFound " + errors.length + " blocking errors.");
  } else {
    console.log("\nNo runtime errors detected in browser. Checking build-time imports...");
  }
})();
