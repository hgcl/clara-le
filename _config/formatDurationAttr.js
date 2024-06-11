// Outputs valid datetime duration string
// Explanation: https://stackoverflow.com/questions/51168022/what-does-pt-prefix-stand-for-in-duration#answers
module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("formatDurationAttr", function (mins) {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    let finalTime;
    finalTime =
      h === 0 && m > 0 ? `${m}M` : h > 0 && m === 0 ? `${h}H` : `${h}H${m}M`;
    return `PT${finalTime}`;
  });
};
