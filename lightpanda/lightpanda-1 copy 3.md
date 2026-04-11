3. Extract data
We will now use the browser to run a search on the HackerNews website . We need Lightpanda here because the website uses XHR requests to display search results. We will also run query selectors directly in the browser to extract and structure the data.

HackerNews

Navigate and search
Similar to the Wikipedia example, edit index.js to navigate to HackerNews:


  await page.goto("https://news.ycombinator.com/");
Type the term lightpanda in the search input at the bottom of the page and press the Enter key to submit the search:


  await page.locator('input[name="q"]').fill('lightpanda');
  await page.keyboard.press('Enter');
Wait for the search results to be displayed, with a timeout limit of 5 seconds:


  await page.waitForFunction(() => {
      return document.querySelector('.Story_container') != null;
  }, {timeout: 5000});
Extract the data
We will loop over the search results to extract the title, the URL, and a list of metadata including the author, the number of points, and comments:


  // Loop over search results to extract data.
  const res = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.Story_container')).map(row => {
      return {
        // Extract the title.
        title: row.querySelector('.Story_title span').textContent,
        // Extract the URL.
        url: row.querySelector('.Story_title a').getAttribute('href'),
        // Extract the list of meta data.
        meta: Array.from(row.querySelectorAll('.Story_meta > span:not(.Story_separator, .Story_comment)')).map(row => {
          return row.textContent;
        }),
      }
    });
  });
The final script
Here is the full version of index.js updated to run the search and extract results:


'use strict'
 
import { lightpanda } from '@lightpanda/browser';
import { chromium } from 'playwright-core';
 
const lpdopts = {
  host: '127.0.0.1',
  port: 9222,
};
 
const playwrightopts = {
  endpointURL: 'ws://' + lpdopts.host + ':' + lpdopts.port,
};
 
(async () => {
  // Start Lightpanda browser in a separate process.
  const proc = await lightpanda.serve(lpdopts);
 
  // Connect using Playwright's chromium driver to the browser.
  const browser = await chromium.connectOverCDP(playwrightopts);
  const context = await browser.newContext({});
  const page = await context.newPage();
 
  // Go to hackernews home page.
  await page.goto("https://news.ycombinator.com/");
 
  // Find the search box at the bottom of the page and type the term lightpanda
  // to search.
  await page.locator('input[name="q"]').fill('lightpanda');
  // Press enter key to run the search.
  await page.keyboard.press('Enter');
 
  // Wait until the search results are loaded on the page, with a 5 seconds
  // timeout limit.
  await page.waitForSelector('.Story_container', { timeout: 5000 });
 
  // Loop over search results to extract data.
  const res = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.Story_container')).map(row => {
      return {
        // Extract the title.
        title: row.querySelector('.Story_title span').textContent,
        // Extract the URL.
        url: row.querySelector('.Story_title a').getAttribute('href'),
        // Extract the list of meta data.
        meta: Array.from(row.querySelectorAll('.Story_meta > span:not(.Story_separator, .Story_comment)')).map(row => {
          return row.textContent;
        }),
      }
    });
  });
 
  // Display the result.
  console.log(res);
 
  // Disconnect Playwright.
  await page.close();
  await context.close();
  await browser.close();
 
  // Stop Lightpanda browser process.
  proc.stdout.destroy();
  proc.stderr.destroy();
  proc.kill();
})();
Run the script
You can run it to see the result immediately:


node index.js
$ node index.js
🐼 Running Lightpanda's CDP server… { pid: 598201 }
[
  {
    title: 'Show HN: Lightpanda, an open-source headless browser in Zig',
    url: 'https://news.ycombinator.com/item?id=42817439',
    meta: [ '319 points', 'fbouvier', '9 months ago', '137 comments' ]
  },
  {
    title: 'Lightpanda: Headless browser designed for AI and automation',
    url: 'https://news.ycombinator.com/item?id=42812859',
    meta: [ '154 points', 'tosh', '9 months ago', '1 comments' ]
  },
  {
    title: 'Show HN: Lightpanda, an open-source headless browser in Zig',
    url: 'https://news.ycombinator.com/item?id=42430629',
    meta: [ '7 points', 'fbouvier', '10 months ago', '0 comments' ]
  },
  {
    title: 'Lightpanda: Fast headless browser from scratch in Zig for AI and automation',
    url: 'https://news.ycombinator.com/item?id=44900394',
    meta: [ '5 points', 'lioeters', '2 months ago', '0 comments' ]
  },
  {
    title: 'Lightpanda – The Headless Browser',
    url: 'https://news.ycombinator.com/item?id=42745150',
    meta: [ '4 points', 'vladkens', '9 months ago', '2 comments' ]
  },
  {
    title: 'Lightpanda raises pre-seed to develop first browser built for machines and AI',
    url: 'https://news.ycombinator.com/item?id=44263271',
    meta: [ '1 points', 'cpeterso', '4 months ago', '0 comments' ]
  }
]
Step 4: Go to production