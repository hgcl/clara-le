import blogrollData from "./blogrollData.js";

async function getBlogrollLinks() {
  return blogrollData;
}

export default async function () {
  try {
    const dataArray = await getBlogrollLinks();
    let finalArray = [];
    dataArray.forEach((el) => finalArray.push(el.url));
    return finalArray;
  } catch (error) {
    console.error(">>> Get blogroll links: " + error);
  }
}
