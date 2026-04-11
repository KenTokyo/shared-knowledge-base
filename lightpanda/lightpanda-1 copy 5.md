
Quickstart
1. Installation and setup
2. Your first test
3. Extract data
4. Go to production
Open source edition
Installation
Usage
Guides
Systems requirements
Cloud offer
Getting started
Tools
CDP
MCP

Cloud offer
Tools
MCP
Model Context Protocol
Use the Model Context Protocol  (MCP) to easily control Lightpanda browser with your AI applications.

Usage
The Lightpanda MCP service supports only SSE  transport.

Depending on your location, you can connect to the MCP using the url wss://euwest.cloud.lightpanda.io/mcp/sse or wss//uswest.cloud.lightpanda.io/mcp/sse.

Authentication
An authentication is required, you can either pass your token with the token query string parameter in the url, or use the Authorization: Bearer HTTP header.

Example with the query string.


https://euwest.cloud.lightpanda.io/mcp/sse?token=TOKEN
Example with the Bearer HTTP header.


https://euwest.cloud.lightpanda.io/mcp/sse
Authorization: Bearer TOKEN
Tools
search Search a term on web search engine and get the search results.
goto Navigate to a specified URL and load the page inmemory so it can be reused later for info extraction.
markdown Get the page in memory content in markdown format.Run a goto before getting markdown.
links Extract all links from the page in memory.Run a goto before getting links.
For more advanced use cases, you can use CDP connection with Playwright MCP .

