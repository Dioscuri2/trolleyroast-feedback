import { chromium } from 'playwright';

async function auditPage(page, url) {
  console.log(`\n--- Auditing: ${url} ---`);
  try {
    const response = await page.goto(url);
    await page.waitForTimeout(2000); // Let React hydration finish
    
    console.log(`Status: ${response.status()}`);
    
    // Check for common error indicators in the UI
    const bodyText = await page.innerText('body');
    if (bodyText.includes('Error') || bodyText.includes('Something went wrong') || bodyText.includes('404')) {
      console.log('❌ Potential UI Crash or Error Text found on page.');
    } else {
      console.log('✅ Page content appears stable.');
    }
  } catch (err) {
    console.log(`❌ Failed to load page: ${err.message}`);
  }
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('BROWSER CONSOLE ERROR:', msg.text());
  });

  await auditPage(page, 'https://trolleyroast.co.uk');
  await auditPage(page, 'https://trolleyroast.co.uk/calculators');
  await auditPage(page, 'https://trolleyroast.co.uk/calculators/weekly-basket-savings');
  await auditPage(page, 'https://trolleyroast.co.uk/blog');
  await auditPage(page, 'https://trolleyroast.co.uk/blog/zombie-foods-supermarket-clean-eating');
  
  await browser.close();
})();
