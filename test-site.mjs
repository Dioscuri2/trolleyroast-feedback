import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

  console.log('\n--- Visiting Specific Blog Post ---');
  const response = await page.goto('https://trolleyroast.co.uk/blog/zombie-foods-supermarket-clean-eating');
  console.log('Status:', response.status());
  
  const h1 = await page.textContent('h1');
  console.log('H1 Text:', h1);
  
  await browser.close();
})();
