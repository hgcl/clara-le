---
title: "Peeking into the IndieWeb world"
subtitle: "My first baby steps"
date: "2022-04-10"
tags: ["digital"]
lang: "en"
---

Robin introduced me to the IndieWeb about a year ago. And as it usually happens, I dived head first into it before he even had time to close his tabs.

I remember struggling quite a bit with the concepts, as the documentation is a bit messy and the standards are overall loosely applied by the community. All in all, I wasn't so successful in getting any closer to the IndieWeb grail.

## But what is the IndieWeb to begin with?

Chris Aldrich explains it way better than I could in his [introduction to the IndieWeb](https://boffosocko.com/2017/07/28/an-introduction-to-the-indieweb/). But to keep things short, it is a movement that is built on three main principles:

1. Ownership of your content — No vendor lock-in as you publish and own your content.
2. Author centric — You can be connected to other services and platforms, but everything comes back to your site.
3. Control of your content and format — You completely control how your website looks and works.

After my recent [website redesign](/posts/last-homage-to-my-old-website/), I decided to have another go at this IndieWeb stuff. And I think I was a bit more successful this time around.

## IndieWeb baby steps...

_...a guide by someone who didn't understand half of what she did._

If you are completely new to this world, I absolutely recommend reading the [introduction to the IndieWeb](https://boffosocko.com/2017/07/28/an-introduction-to-the-indieweb/) mentioned before. It really helped me get the "why the IndieWeb" part pinned down.

On the side, it is also always good to have a look at the official [IndieWeb "Getting Started" page](https://indieweb.org/Getting_Started). Most documentation is available there.

So what about some concrete steps, now?

1. Domain name — First of all, you will need to own your domain name to set up most of the IndieWeb stuff we'll talk about. [Wiki: how to get your domain name.](https://indieweb.org/personal-domain)
2. Web sign in — Something that is pretty common in IndieWeb circles is to enable login to services with your domain name alone. [Wiki: how to set up web sign in.](https://indieweb.org/How_to_set_up_web_sign-in_on_your_own_domain)
3. Join the IndieWeb webring — Once you have a web sign in setup, you are ready to join the [IndieWeb webring](https://xn--sr8hvo.ws/)! Or at least, I would highly recommend browsing through the ring — start at the [footer of my homepage](#webring) — to see how all of these standards are applied by real websites.
4. Mark up your content — Use [microformats](http://microformats.org/) to mark up your content and enable a ton of IndieWeb features in the future. I started with an [`h-card`](http://microformats.org/wiki/h-card) (or profile card) on my homepage, as well adding microformats to my blog posts.
5. Enabling webmentions — After months, Rowan Manning's article _[Webmentions for your Static Site](https://rowanmanning.com/posts/webmentions-for-your-static-site/)_ finally clarified for me what webmentions were all about. I went for the simplest setup, using [webmention.io](https://webmention.io/) to receive webmentions and [Telegraph](https://telegraph.p3k.io/) to manually send them.

If you are still confused after reading the many wikis and articles, feel free to have a look at my homepage markup. It definitely helped me to compare the documentation to some real life examples.

Another good link to have open on the side at all times is [IndieWebify.me](https://indiewebify.me/) that will give you a few starting tips and allow you to test some of your setups.

Now that everything _seems_ to be technically viable, the question that remains is: "How do I really want to use these tools?" --ENDCHAR--
