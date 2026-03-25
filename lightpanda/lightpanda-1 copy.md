Quickstart
In this Quickstart, you’ll set up your first project with Lightpanda browser  and run it locally in under 10 minutes. By the end of this guide, you’ll have:

A working Node.js  project configured with Lightpanda
A browser instance that starts and stops programmatically
The foundation for running automated scripts using either Puppeteer  or Playwright  to control the browser
Installation and setup
Your first test
Extract data
Go to production with Lightpanda cloud
1. Installation and setup
Prerequisites
You’ll need Node.js  installed on your computer.

Initialize the Node.js project
Create a hn-scraper directory and initialize a new Node.js project.


mkdir hn-scraper && \
  cd hn-scraper && \
  npm init
You can accept all the default values in the npm init prompts. When done, your directory should look like this:

Install Lightpanda dependency
Install Lightpanda by using the official npm package .


npm install --save @lightpanda/browser
Create an index.js file with the following content:


'use strict'
 
import { lightpanda } from '@lightpanda/browser';
 
const lpdopts = {
  host: '127.0.0.1',
  port: 9222,
};
 
(async () => {
  // Start Lightpanda browser in a separate process.
  const proc = await lightpanda.serve(lpdopts);
 
  // Do your magic ✨
 
  // Stop Lightpanda browser process.
  proc.stdout.destroy();
  proc.stderr.destroy();
  proc.kill();
})();
Run your script to start and stop a Lightpanda browser.


node index.js
Starting and stopping the browser is almost instant.

$ node index.js
🐼 Running Lightpanda's CDP server... { pid: 4084512 }
Step 2: Your first test