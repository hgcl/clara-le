// Cloudflare docs on Request interface: https://developers.cloudflare.com/workers/runtime-apis/request/
export const onRequestPost = async (context) => {
  const { request, env } = context;
  let data;

  // 1. Get form `data` as JSON
  try {
    data = await request.json();
  } catch {
    return new Response("Invalid JSON.", { status: 400 });
  }

  let filename;
  let fileContent;

  // FOR BOOKMARKS
  if (data.category === "bookmarks") {
    // Format filename
    const slug = slugify(data.title.trim());
    filename = `${data.date}-${slug}.json`;

    // From checkbox to boolean
    let formattedBest;
    if (data.best && data.best === "on") {
      formattedBest = "true";
    } else {
      formattedBest = "false";
    }

    // Format tags
    const formattedTags = data.tags.split(",");

    // Format content
    const json = {
      url: data.link.trim(),
      title: data.title.trim(),
      date: data.date,
      description: data.description.trim(),
      tags: formattedTags,
      best: formattedBest,
    };

    fileContent = JSON.stringify(json);
  }

  // FOR MUSINGS
  if (data.category === "posts") {
    // Format filename
    const slug = slugify(data["posts-title"].trim());
    filename = `${slug}.md`;

    // Format tags
    const tagsArray = data["posts-tags"].split(",");
    const formattedTags = `"${tagsArray.map((tag) => tag.trim()).join(`","`)}"`;

    // Format frontmatter
    const frontmatter = `title: "${data["posts-title"]}"\nsubtitle: "${data[
      "posts-subtitle"
    ].trim()}"\ndate: "${
      data["posts-date"]
    }"\ntags: [${formattedTags}]\nlang: "${data["posts-lang"]}"`;

    // Format content
    fileContent = `---\n${frontmatter}\n---\n\n${data["posts-content"]}`;
  }

  // 3. Prep for GitHub
  // Encode for GitHub
  const base64Content = btoa(unescape(encodeURIComponent(fileContent)));

  // GitHub API setup
  const GITHUB_TOKEN = env.GITHUB_TOKEN; // stored as secret
  const REPO = "hgcl/clara-le";
  const githubUrl = `https://api.github.com/repos/${REPO}/contents/src/${data.category}/${filename}`;

  const body = JSON.stringify({
    message: `content: :robot: new entry in ${data.category}: ${filename}`,
    content: base64Content,
  });

  const githubResp = await fetch(githubUrl, {
    method: "PUT",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "cloudflare-worker",
    },
    body,
  });

  if (githubResp.ok) {
    return new Response("Submission saved!", { status: 201 });
  } else {
    const error = await githubResp.text();
    return new Response("GitHub upload failed: " + error, { status: 500 });
  }
};

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
