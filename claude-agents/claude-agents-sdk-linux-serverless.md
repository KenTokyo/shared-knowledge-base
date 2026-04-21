Hier ist die sprachlich bereinigte und formatierte Version, ohne inhaltlich etwas wegzulassen:

Okay, guys, take a look at this: this is a serverless environment running the Claude Agent SDK. Until very, very recently, this simply was not possible. In this video, I’m going to show you exactly how we’re using the Claude Agent SDK to do some pretty impressive things.

This is also a preview of Harbor Build, which is coming very, very soon. It will basically build an entire website for you based on the inputs you give it.

This is an example of one of the websites it created for me, and it actually works. You can literally book things using Stripe.

Harbor Build is coming to Harbor very soon, but that’s not what this video is about. This video is actually about the Claude Agent SDK and managed agents.

Let’s jump in.

So basically, if you’ve used the Claude API before, you’ve probably used the Messages API, right? That’s a very basic conversational API where you can, well, have a conversation with AI.

The Managed Agents API, on the other hand, is completely different. One of the main things it provides is a configurable agent harness that runs in managed infrastructure. It supports long-running tasks and async work, and that’s the really important part here.

Another very cool thing is that you can add MCP servers, you can add skills, and you can add a lot more.

So that’s what we’re going to be talking about in today’s video: the agent architecture, how we build and deploy live websites with Anthropic’s Managed Agents API, serverless Convex, and a per-user vault.

A user types a prompt, and a site goes live. That’s Harbor Build.

So the user describes the site they want, we scaffold it, and then the agent builds an Astro project in a Linux sandbox. We sync to E2B, which gives a preview similar to Lovable, Bolt, and tools like that. Then, once the website is done, the user can claim it. Or rather, they will be able to claim it through a process where they connect their Supabase, GitHub, Vercel, Stripe, and so on. At the end of that, they get the finished website.

We’re on the beta Managed Agents API, and the really important thing here is the persistent sandbox. You get bash, write, and read across many turns without replaying state. Sessions can last up to three hours. That means 20-minute builds don’t hit HTTP action timeouts.

Built-in MCP is another really cool part. Instead of having to mess around with building some kind of interface for the AI, we use managed agents, which already have MCP built into them. On top of that, you get vault-scoped credentials, which means we can take people’s credentials, put them into a vault in Anthropic’s system, and that’s where things start to get super, super interesting.

So yeah, this is basically how the whole system works. The main thing is the Linux sandbox, which is incredibly nice.

Instead of using the Messages API, we use the Agents SDK inside a Linux sandbox. You can basically create anything with this.

And one of the coolest things about it, by the way, is that it already has these tools built in. Claude Managed Agents gives Claude access to a comprehensive set of built-in tools: bash, file operations, read, write, edit, glob, website search and fetch, and MCP servers.

What does that mean? It means these capabilities are built directly into the system. With no extra coding whatsoever, I managed to build a system that uses bash over and over again—bash, bash, bash, write, write, write, bash, bash, bash. Previously, that would have taken me so much effort to do without the Managed Agents SDK.

Now, the really cool part is that you can also add any tool you want. It’s not limited to the built-in tools.

For example—and I’ve done this before with the Messages API—if you wanted to add something like Bright Data to your stack, which, by the way, thank you to Bright Data for sponsoring this video, you can get $25 in free credit with Bright Data using the link in the description.

All you would need to do is go to a piece of code you want to use—for example, in the playground—and select the Unlocker API, which in my opinion is the most useful one. Then you either go to the code examples or the playground, grab the getting-started snippet, copy it, give it to Claude Code, and tell it you want a new tool that uses Bright Data to scrape a website.

If you don’t know, the way Bright Data helps here is with sites like iSuit. There’s a huge problem with iSuit: it’s protected by Cloudflare. That means we can’t scrape it using normal scraping methods, which is why we use Bright Data to come in and scrape it instead. Without Bright Data, we simply wouldn’t be able to do that.

So basically, if you need something like a universal scraping system, or if you need to scrape specific sources like TikTok, Facebook, Google Maps, and things like that, that’s where Bright Data comes in. And we actually do use Bright Data inside Harbor.

You can see here that this is our usage of Bright Data over roughly the last month or so. We use it every single day to scrape websites protected by Cloudflare. Not only that, but we also use it as a backup scraper.

The way Harbor works is that we scrape people’s websites for images. If that returns no images, we then try a Bright Data scrape instead. If that works, we take the images and use them in the article. If it still doesn’t work, we try a few other things as well.

So just so you guys know, I’m showing you this as an example of what I’ve been working on over the last three days or so. I’m really, really excited to release Harbor Build, but it’s not quite ready yet, and we’re not even fully sure how we want to release it. But it is literally one of the best website builders I’ve ever used.

It’s significantly better than Lovable, better than Bolt, better than, you know, whatever. It gives you SEO-friendly websites that are basically ready to go. But again, that’s not what this video is about—I just wanted to show you what’s actually possible with managed agents.

Another thing we’re using managed agents for is Harbor Co-pilot, which is coming even sooner. Again, I’m just showing you this as an example of what you can do with the Agents SDK, or with managed agents in general.

This uses the same system. You can see it thinking here, and then it basically tells you everything it can do for you. This is an agency account, so it explains things from an agency perspective. But again, all of this works through the same system where everything it can do is listed as a tool inside the code.

So for example, if you say “add a client,” it invokes the “add a client” tool and uses it to add a client to Harbor. If you say, “Add a website to this account—say, 2men.it,” you’ll see it invoke the tools. There we go: “Find sitemap,” that’s tool number one. “Create site,” that’s tool number two. It gets the site, then creates the site, and so on.

These are all bespoke tools inside the API, inside our managed agent. And it is so easy to code, it’s ridiculous. It’s genuinely so easy to code.

So yeah, guys, go watch the video. There’s a link to Bright Data in the description and in the pinned comment. If you need enterprise-level scraping for whatever you’re building, go check out Bright Data.

Now let’s get back into the video.

This is kind of the magic here. This is the one agent we build. This is the actual code we use. It creates an agent, includes all the tools it needs, includes all the MCP servers it needs, and it just works because the model itself is so intelligent.

We actually just switched to Sonnet 4.6 because Opus 4.7 is, to be honest, a little too expensive.

So the build I showed you a moment ago—that was actually Sonnet 4.6, not Opus 4.7. That’s why the build maybe isn’t quite as good as an Opus build would be. But honestly, it still looks pretty good.

You can choose the model, you can choose the system prompt, you can add MCP servers, and—most importantly—you can add bespoke tools. If you need a tool to scrape, a tool to add a website, or a tool to do basically anything else, you can add as many tools as you want. That’s one of the most beautiful things about this setup.

And it starts the agent inside a Linux sandbox, which you can read more about on Anthropic’s website.

These are all of the agents. If you go to platform.claude.com and then to Managed Agents, you can see all the agents spawned from my code, and they also appear here in the UI.

This is the really beautiful part: you have a system prompt, and you could also use skills instead of system prompts. I thought I had skills configured, but apparently I didn’t configure them properly. I could edit this and add a skill, but that’s not what I’m going to do here.

Then we have MCPs, which are the really, really interesting part, because you can connect to people’s services without having to store credentials yourself. They’re stored in these credential vaults right here.

Every time you start a managed environment—a managed agent—it stores the credentials there, so you don’t have to worry about storing them yourself. That is incredibly useful.

And look, the whole time I’ve been talking, this thing has been building in the background. I genuinely cannot wait to release this to people. It’s not ready for production just yet, but when it is, it’s going to be amazing to show you guys.

If you think of this as being able to spawn your own version of Claude Code anywhere in the world, at any time, with people’s credentials inside it, then you start to understand why this is so valuable.

Because you can sell these systems to people. You can go to a company and say, “Look, I can automate a lot of the work your employees currently do, and I can do it much more cheaply using AI and this system.” A lot of companies are going to be very interested in that.

And not only that, but you’re in control of the system. I don’t run it—you run it. That’s when people start to get really interested.

Like I said, the credential piece is incredibly important. You no longer have to ask yourself, “How do I give an agent running in the cloud access to GitHub?” That used to be a question I couldn’t really answer in my own head. But now it makes sense: we store the credential in a vault, and Claude accesses that vault when it uses an MCP.

Super nice. Super interesting.

And even if an MCP doesn’t exist, you can still just use bash—bash scripts for Vercel and Resend, for example. Because the agent is running in a Linux container in the cloud, it can run CLI commands.

So when Harbor Build connects to Vercel—which it will do when it launches your website—and when it wires up things like Resend emails, it can do that through the CLI instead of MCP. For example, if someone buys something from your Harbor Build website, it can send them an email. And it does that not through MCP, but through the CLI, because it’s running in a Linux environment.

Then there’s the launch session, meaning how the whole process actually works internally. That part isn’t as important. The key part is the initial user message, because that’s where we inject the variation.

That’s how you create different outputs. It doesn’t create the same thing every time. The user input—the prompt—changes the outcome of the entire build.

And this is what we see in the interface: what the agent tells us. On the left, you can see when it uses an MCP, when it sends an agent message, when there’s an error, and so on. That’s obviously really useful for users.

Then we have four classes of tools: built-ins like bash, write, read, and edit; MCPs like GitHub, Supabase, and Stripe; custom bash protocol; and the anti-tool.

The anti-tool is from Anthropic themselves and is designed to help protect against prompt injection.

And this is really the whole idea of Harbor Build: we build, then we patch, meaning we make changes to people’s websites, but the thread continues. It stays within the same conversation as before.

So you effectively have three different agent behaviors all in one box. It’s super, super interesting stuff.

And then this is what we would have had to build ourselves without managed agents: some way to run Claude Code in the CLI, which would mean a VPS or something similar; support for three-hour-plus sessions; some way to get MCP into the setup; a solution for the credentials problem, which is a nightmare; and some way to handle streaming, which is also a nightmare.

But with managed agents and Convex’s agent component, you can pretty much build anything instantly using this system.

So how do you actually build one of these agents today?

What I would personally recommend is going into Claude. Let’s start a new session here—I’ve been using the app more and more, guys, and I honestly can’t recommend it enough. Let’s call the session “managed agents.”

Then I would say something like: “Do a deep dive into managed agents and how they work. I want you to be able to spawn a Sonnet 4.6 managed agent for me using the Anthropic API. Start by researching it.”

That’s the first step: you need to understand how managed agents work.

There’s actually a Claude API skill now included in Claude Code, so I’m going to assume it already includes everything I need. Managed agents seem to be supported already, which is really amazing.

Now let’s build a very quick example. Let’s say: “Stop. Build me a quick working example in HTML, CSS, JavaScript, and Python. It should be a universal scraper that scrapes images using LLM scrape and Bright Data to scrape the content. It should extract JSON based on what the user inputs. For example, if they say, ‘Get me all the images from this page,’ it should output the images in JSON.”

It’s also really cool that it can open this in the preview. I absolutely love that part of Claude Code.

This thing is cooking.

Theo, for some reason, hates this on Twitter. Someone told me it’s because it basically replaced his entire SaaS. But honestly, this is insanely cool.

Obviously, the preview here is in light mode—or actually maybe dark-on-dark—but that’s fine.

Okay, there we go. Now let’s say “2men.it” and then something like “Extract pricing, product information, and product images.”

There we go: unlocking 2men via Bright Data. Beautiful.

It’s just insane that you can do this that quickly.

Absolutely absurd, guys. Absolutely absurd.

So it created a custom tool—the Bright Data scraper—and then I’m not entirely sure why it isn’t getting the images and everything yet. I’d have to investigate that more closely. But this is still just a very quick example.

Let’s try a different one. Let’s do iSuit, which cannot be scraped by traditional means and needs something like Bright Data. Honestly, Bright Data is the preferred option anyway. The pricing is very, very good. It’s super cheap.

And there we go. Look at that. We just created a universal scraper using managed agents in literally under 20 seconds. Previously, this was not possible. This is absolutely crazy.

So now you have a custom tool that unlocks with Bright Data, plus a custom scraper, plus a prompt that handles the whole thing for you. And you could run all of this serverlessly, in the cloud, for other people. It’s absolutely absurd.

This is replacing things like n8n, for sure.

You can connect through MCP and use vaults, so you don’t even have to worry about storing people’s credentials.

And yeah, during this entire time, Harbor Build has been running in the background and has built me this website right here.

Let’s see if Stripe works. It might not.

Yeah—cross-site POST form submissions are forbidden. That’s fine. That’s probably just a CORS issue or something similar.

But this is the website that Sonnet 4.6 created. It’s absolutely insane. I seriously cannot wait to show you guys Harbor Build.

The really cool thing about Harbor Build—which I genuinely can’t wait to show people—is that it has a CMS built into it. So if you want to change the price of something, add new products, or update the site in general, you can literally do that inside Harbor.

You can also use Co-pilot by pressing Control+K to help add more products.

All of this is only possible because of managed agents and Opus 4.7. I’ve been cooking for more than 40 hours since Opus 4.7 was released. For context, that was about four days ago.

I’m absolutely knackered, guys.

So I’m going to leave the video there. Thank you so much for watching. Go check out Bright Data. Go check out Harbor SEO. And if you watched all the way to the end, you’re an absolute legend.

I’ll see you very, very soon with more content.

Peace out.

Wenn du willst, mache ich dir daraus direkt noch eine natürlich klingende YouTube-Skript-Version mit besserem Flow und kürzeren, saubereren Sätzen.

erkläre das scrersnhot und jetzt erzeuge aus den sachzen ein sachtext mit sektionen, guter formatierung, und erkläre es
Thought for 19s

Gerne — hier ist zuerst eine verständliche Erklärung des Screenshots und danach ein sauber formulierter Sachtext mit Sektionen.

Erklärung des Screenshots

Der Screenshot zeigt eine Präsentationsfolie zu einer Linux-Sandbox für Agenten. Die zentrale Aussage lautet:

„A Linux sandbox. Fresh every session.”
Auf Deutsch: „Eine Linux-Sandbox. Bei jeder Sitzung neu.“

Damit ist gemeint:

Jede neue Sitzung startet in einer frischen, sauberen Umgebung.
Innerhalb einer laufenden Sitzung bleiben Änderungen jedoch erhalten.
Der Agent arbeitet also nicht in einer simulierten Umgebung, sondern in einer echten Shell mit echten Befehlen.
Was links erklärt wird

Unter „What’s in the box“ steht, was diese Umgebung enthält:

Ubuntu userland
Die Umgebung basiert auf Ubuntu bzw. einer typischen Linux-Nutzerumgebung.
bash, python3, node, npm, git
Wichtige Werkzeuge sind bereits vorhanden. Damit kann der Agent Skripte ausführen, Programme installieren, Projekte bauen und mit Git arbeiten.
Full filesystem at /tmp/<slug>/
Der Agent kann mit einem echten Dateisystem arbeiten und dort Dateien anlegen, lesen, bearbeiten und speichern.
Outbound network allowed
Ausgehende Netzwerkverbindungen sind erlaubt. Das bedeutet, dass der Agent auf externe Dienste zugreifen kann.
Persists across turns within a session
Der Zustand bleibt innerhalb derselben Sitzung über mehrere Schritte hinweg erhalten. Wenn also in einem Schritt Dateien erstellt werden, sind sie im nächsten Schritt noch da.
Was rechts gezeigt wird

Rechts sieht man ein Beispiel aus der Shell:

Es wird in ein Verzeichnis gewechselt:
cd /tmp/harbor-slug
Danach wird ein Projekt mit Astro erstellt:
npm create astrolatest -- --yes
Anschließend werden Abhängigkeiten installiert:
npm install
Dann wird das Projekt gebaut:
npm run build
Zum Schluss werden Dateien mit einem curl-Befehl an eine Vorschau- oder Sync-URL gesendet:
curl -X POST ...

Das zeigt: Der Agent kann wirklich entwickeln, bauen und Daten übertragen.

Kernaussage des Screenshots

Die Folie will beweisen, dass ein Agent:

in einer realen Linux-Umgebung arbeitet,
echte Tools nutzen kann,
Dateien und Projekte bearbeiten kann,
Netzwerkzugriff hat,
und über mehrere Interaktionen hinweg kontextstabil bleibt.

Der Satz unten fasst das zusammen:

„The agent runs real shell commands — not pretend ones.”
Also: Der Agent führt echte Shell-Befehle aus und tut nicht nur so.

Sachtext: Die Linux-Sandbox als Arbeitsumgebung für Agenten
Einleitung

Eine Linux-S