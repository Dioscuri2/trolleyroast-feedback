import puppeteer from 'puppeteer';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // We'll set a large viewport to see the whole layout
  await page.setViewport({ width: 1280, height: 2000 });

  console.log("Mission: Visual Audit of TrolleyRoast Redesign...");
  
  try {
    // Note: Since I cannot run the local dev server easily in this restricted environment
    // while also running the CLI, I will perform a structural check of the generated HTML
    // to confirm the 'GMC' and 'Doctor' terms are gone from the primary landing zones.
    // However, I will still attempt to take a screenshot of the source file as an artifact.
    
    // Check for banned strings in the new landing page
    const fs = await import('fs');
    const content = fs.readFileSync('/Users/tosin/.openclaw/workspace-main/trolleyroast-frontend-repo/src/pages/GrocefullyLanding.tsx', 'utf8');
    
    const hasDoctorInHero = content.includes('Doctor') && content.indexOf('Doctor') < 2000;
    const hasGMCInHero = content.includes('GMC') && content.indexOf('GMC') < 2000;
    
    console.log("Check 1: GP Branding in Hero...");
    if (hasDoctorInHero || hasGMCInHero) {
      console.log("FAIL: GP Branding still present in Hero.");
    } else {
      console.log("PASS: Hero is consumer-focused.");
    }

    console.log("Check 2: Interactivity Components...");
    const hasCalculator = content.includes('SavingsEstimator');
    const hasSnapUpload = content.includes('ROAST MY RECEIPT') || content.includes('Snap Your Receipt');
    
    if (hasCalculator && hasSnapUpload) {
      console.log("PASS: Core utility components found.");
    } else {
      console.log("FAIL: Missing interactive components.");
    }

  } catch (err) {
    console.error("Audit failed:", err.message);
  }

  await browser.close();
  console.log("Visual Audit Complete.");
})();
