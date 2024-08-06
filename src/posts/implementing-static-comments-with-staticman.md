---
title: "Implementing static comments with Staticman"
subtitle: "Back on the coding train"
date: "2024-05-20"
tags: ["digital"]
lang: "en"
---

It had been forever I hadn't been properly coding. My environment[^1] of the last few months wasn't really helping. But now that we are staying in Hanoi (and spending most of our time in coffee shops), I am finding the time to code again.

And today, I finally integrated a comment feature to my blog posts. It feels great to dive into a project like this, figuring things out bit by bit, and being able to _make it work_!

Being no influencer, I'm not even sure I'll get one comment out of it all. But well, I like having this door of possibilities open. (Also, I'm so bad with emails. I wishfully believe that dealing with comments will be better.)

I won't go into the details of how I did it all ([others](https://spinningnumbers.org/a/staticman-heroku.html) [do it](https://travisdowns.github.io/blog/2020/02/05/now-with-comments.html) [better](https://mademistakes.com/mastering-jekyll/static-comments-improved/)). I lack most of the vocab, as well as expertise to explain it properly. In this post, I will simply document an outline of my general setup for future reference.

---

## 1. Choose a system

So first thing first, there are tons of ways to get comments on a static website out there. I wanted a system that :

1. was at my coding level
2. gave me complete ownership of the data

I found that [Staticman](https://staticman.net/) was ticking all these boxes. Disclaimer: there are some big cons[^2], but not big enough to deter me (for now).

<aside>

### How is it supposed to work?

1. Someone submits a comment on the website.
2. The form sends a `POST` request to the Staticman app with the comment info.
3. Through a bot, the Staticman app has access to the website repo and creates a PR. In this PR, the new comment is saved as an entry in a folder.
4. The moderator can either merge (accept) or close (reject) the PR for the new comment. Accepting will redeploy the website and display the new comment under the correct blog post.

</aside>

## 2. Deploy a Staticman app

- **Set up a server** — I first needed to deploy my own Staticman app somewhere. The docs recommend using Heroku, but it unfortunately doesn't have a free tier anymore. I went with [Adaptable](https://adaptable.io/) instead.
- **Create a bot account** — I created another GitHub account[^3], to which I gave writing access to this website repository. This second account is used as a "bot" to handle comments through Staticman.
- **Deploy the web service** — On the bot account, I forked the main [Staticman repo](https://github.com/eduardoboucas/staticman). That fork was used to deploy my own web service.
- **Access permissions** — The Staticman app uses a GitHub "personal access token" to interact with the bot account (to create PRs). It is saved on the server as an environment variable.
- **Add a webhook** — As a final touch, I added a webhook to this website repo. Basically, once a PR for a new comment is approved and merged, GitHub automatically sends out a `POST` request to Staticman through this webhook. The bot will then delete the branch that was created for this PR and keep the repo tidy.

## 3. Create a comment form

Once the Staticman app was up and running, it was hungry for comments. And for that job, there was nothing better than a simple form added to my blog post template. The docs gives a [good example of what it should look like](https://staticman.net/docs/getting-started.html#step-4-hook-up-your-forms).

## 4. Display the comments

Once a comment has been sent to the Staticman app (through the form), the bot account creates a PR on the website repo to either accept or reject that comment. Accepting the PR will save that comment entry (as a `YAML` file) in a specific folder.

From there, different static sites generators make it more or less easy to display custom data in different blog posts. As the generator I am using is quite minimal, I chose to inject the comments in their corresponding articles during the `postbuild` phase of my website.

It is not the cleanest way, but well, it works for now.

## 5. Handle spams

I didn't really want the full reCAPTCHA shenanigan. This is an MVP, so I just went for the simple "invisible fields that cannot be filled except by bots" technique. I am not sure if this method still works in 2024 — but this website is tiny, so I just hope that it's going to be _okay_?

---

All in all, I now have a working (_fingers crossed_) comment feature. It is still quite minimal, not allowing for replies or notifications.[^4] If you notice anything breaking, please let me know!

Until then --ENDCHAR--

[^1]: (1) Being constantly on the move, and (2) my laptop being unusable for a few months.
[^2]: (1) It is not actively maintained anymore, but still working for many. (2) It seems overcomplicated / resource intensive for something that could be done with Cloudflare workers. The problem is I need to learn how to use these first.
[^3]: You could also skip the bot and give Staticman access to your main account, but it is seriously NOT recommended for security reasons.
[^4]: I will also try to upgrade it to serverless functions in the future, but that seems so above my current level. I'll probably just postpone it until Robin shows me how to do it. Or I'll do it, break it, and force him to help me.
