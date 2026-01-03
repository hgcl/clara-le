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

  // 2. Restructure file content
  const filename = `${data.date}.json`;

  // From checkbox to boolean66
  if (data.best && data.best === "on") {
    data.best = "true";
  } else {
    data.best = "false";
  }

  // const fileContent = `{\n  "url": "${data.link.trim()}",\n  "title": "${data.title.trim()}",\n  "date": "${
  //   data.date
  // }",\n  "description": "${data.description.trim()}",\n  "tags": ["${data.tags.trim()}",\n  "best": ${
  //   data.best
  // }]\n}`;
  const fileContent = "";

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
