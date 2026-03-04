const eleventyPluginHandlebars = require("@11ty/eleventy-plugin-handlebars");
const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyPluginHandlebars);
  eleventyConfig.addDataExtension("yml", (contents) => yaml.load(contents));
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));
  eleventyConfig.addPassthroughCopy("src/admin/config.yml");
  eleventyConfig.addPassthroughCopy("src/assets/uploads");
  eleventyConfig.addCollection("projects", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/content/projects/*.md")
      .sort((a, b) => b.date - a.date);
  });

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
