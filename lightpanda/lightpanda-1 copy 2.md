2. Your first test
Lightpanda is a headless browser built from scratch. Unlike Headless Chrome, it has no UI or graphical rendering for humans, which allows it to start instantly and execute pages up to 10x faster.

Unlike curl , which only fetches raw HTML, Lightpanda can execute JavaScript and run query selectors directly in the browser.

It’s ideal for crawling, testing, and running AI agents that need to interact with dynamic web pages, and it’s fully compatible with libraries like Puppeteer  and Playwright .

In this example, you’ll connect cd CDP client, Puppeteer  or Playwright  to Lightpanda and extract all reference links from a Wikipedia page .

Connect CDP Client to Lightpanda
Install the puppeteer-core or playwright-core npm package.

Unlike puppeteer and playwright npm packages, puppeteer-core and playwright-core don’t download a Chromium browser.


npm install -save puppeteer-core
Edit your index.js to connect to Lightpanda:


'use strict'
 
import { lightpanda } from '@lightpanda/browser';
import puppeteer from 'puppeteer-core';
 
const lpdopts = {
  host: '127.0.0.1',
  port: 9222,
};
 
const puppeteeropts = {
  browserWSEndpoint: 'ws://' + lpdopts.host + ':' + lpdopts.port,
};
 
(async () => {
  // Start Lightpanda browser in a separate process.
  const proc = await lightpanda.serve(lpdopts);
 
  // Connect Puppeteer to the browser.
  const browser = await puppeteer.connect(puppeteeropts);
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
 
  // Do your magic ✨
  console.log("CDP connection is working");
 
  // Disconnect Puppeteer.
  await page.close();
  await context.close();
  await browser.disconnect();
 
  // Stop Lightpanda browser process.
  proc.stdout.destroy();
  proc.stderr.destroy();
  proc.kill();
})();
Run the script to test the connection between Puppeteer or Playwright and Lightpanda:


node index.js
$ node index.js
🐼 Running Lightpanda's CDP server... { pid: 31371 }
CDP connection is working
Extract all reference links from Wikipedia
Update index.js using page.goto to navigate to a Wikipedia page and extract all the reference links:


  // Go to Wikipedia page.
  await page.goto("https://en.wikipedia.org/wiki/Web_browser");
Execute a query selector on the browser to extract the links:


  // Extract all links from the references list of the page.
  const reflist = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.references a.external')).map(row => {
      return row.getAttribute('href');
    });
  });
Here’s the full index.js file:


'use strict'
 
import { lightpanda } from '@lightpanda/browser';
import puppeteer from 'puppeteer-core';
 
const lpdopts = {
  host: '127.0.0.1',
  port: 9222,
};
 
const puppeteeropts = {
  browserWSEndpoint: 'ws://' + lpdopts.host + ':' + lpdopts.port,
};
 
(async () => {
  // Start Lightpanda browser in a separate process.
  const proc = await lightpanda.serve(lpdopts);
 
  // Connect Puppeteer to the browser.
  const browser = await puppeteer.connect(puppeteeropts);
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
 
  // Go to Wikipedia page.
  await page.goto("https://en.wikipedia.org/wiki/Web_browser");
 
  // Extract all links from the references list of the page.
  const reflist = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.references a.external')).map(row => {
      return row.getAttribute('href');
    });
  });
 
  // Display the result.
  console.log("all reference links", reflist);
 
  // Disconnect Puppeteer.
  await page.close();
  await context.close();
  await browser.disconnect();
 
  // Stop Lightpanda browser process.
  proc.stdout.destroy();
  proc.stderr.destroy();
  proc.kill();
})();
Execute the link extraction
Execute index.js to see the links directly in your console:


node index.js
$ node index.js
🐼 Running Lightpanda's CDP server... { pid: 34389 }
all reference links [
  'https://gs.statcounter.com/browser-market-share',
  'https://radar.cloudflare.com/reports/browser-market-share-2024-q1',
  'https://web.archive.org/web/20240523140912/https://www.internetworldstats.com/stats.htm',
  'https://www.internetworldstats.com/stats.htm',
  'https://www.reference.com/humanities-culture/purpose-browser-e61874e41999ede',
Step 3: Extract data
