const blogrollData = require("./blogrollData");

async function getBlogrollLinks() {
  return blogrollData;
}

module.exports = async function () {
  try {
    const dataArray = await getBlogrollLinks();
    let finalArray = [];
    dataArray.forEach((el) => finalArray.push(el.url));
    return finalArray;
  } catch (error) {
    console.error(error);
  }
};
