const eleventyPluginHandlebars = require("@11ty/eleventy-plugin-handlebars");
const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyPluginHandlebars);
  eleventyConfig.addDataExtension("yml", (contents) => yaml.load(contents));
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
  eleventyConfig.addWatchTarget("src/assets/css/**/*.css");
  eleventyConfig.addPassthroughCopy("src/admin/config.yml");
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/icons");
  eleventyConfig.addPassthroughCopy("src/assets/uploads");

  eleventyConfig.addCollection("pages", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/pages/*.md").sort((a, b) => {
      const titleA = (a.data.title || "").toLowerCase();
      const titleB = (b.data.title || "").toLowerCase();
      return titleA.localeCompare(titleB);
    });
  });
  eleventyConfig.addCollection("published_books", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/books/*.md").sort((a, b) => {
      const yearA = Number.parseInt(a.data.publication_year, 10);
      const yearB = Number.parseInt(b.data.publication_year, 10);
      const safeYearA = Number.isNaN(yearA) ? Number.MAX_SAFE_INTEGER : yearA;
      const safeYearB = Number.isNaN(yearB) ? Number.MAX_SAFE_INTEGER : yearB;
      return safeYearA - safeYearB;
    });
  });
  eleventyConfig.addFilter("take", (arr, count) => (Array.isArray(arr) ? arr.slice(0, count) : []));

  return {
    templateFormats: ["hbs", "html", "md"],
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "hbs",
    markdownTemplateEngine: "hbs",
  };
};
