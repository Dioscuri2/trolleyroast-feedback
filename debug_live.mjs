import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => {
    console.log('--- ACTUAL RUNTIME ERROR ---');
    console.log(err.message);
    console.log(err.stack);
  });

  console.log("Navigating to https://trolleyroast.co.uk/ ...");
  try {
    await page.goto('https://trolleyroast.co.uk/', { waitUntil: 'networkidle0' });
    // Wait a bit to ensure React hydration has failed
    await new Promise(r => setTimeout(r, 5000));
  } catch (e) {
    console.log("Nav failed:", e.message);
  }

  await browser.close();
  console.log("Debug Complete.");
})();
