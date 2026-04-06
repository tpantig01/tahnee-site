module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("dateDisplay", (dateVal) => {
    const d = new Date(dateVal);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  });

  eleventyConfig.addFilter("markdownify", (str) => {
    const md = require("markdown-it")({ html: true });
    return md.render(str || "");
  });

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("admin");

  eleventyConfig.addCollection("works", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/works/*.md").sort((a, b) => {
      return (a.data.order || 99) - (b.data.order || 99);
    });
  });

  eleventyConfig.addCollection("writing", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/writing/*.md")
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
    },
  };
};
