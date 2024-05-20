## Comment system

The comment system is integrated through [Staticman](https://github.com/eduardoboucas/staticman).

- I have my own Staticman app, deployed on [Adabtable](https://adaptable.io/). It listens to any `POST` requests from the comment form and pushes them to this repo as data files (`data/comments/post-[article-name]/[entry.yml]`).
- A new comment appears as a PR called `Comment from [author] on post-[article-name]`. I need to merge or close the PR to either accept or reject the comment.
- The link between the Staticman app and this repo is taken care by an intermediary Github account (`hgcl-bot`) that has writing access to this repo.
- On clarale.com, the comment form is displayed on the `blog-posts.html` template. Only blog posts enable comments.
- Existing comments are displayed below the comment form in descending order.
