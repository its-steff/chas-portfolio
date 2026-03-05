const eleventyPluginHandlebars = require("@11ty/eleventy-plugin-handlebars");
const yaml = require("js-yaml");

function getByPath(obj, path) {
  return path.split(".").reduce((acc, segment) => {
    if (acc && Object.prototype.hasOwnProperty.call(acc, segment)) {
      return acc[segment];
    }
    return undefined;
  }, obj);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyPluginHandlebars);
  eleventyConfig.addDataExtension("yml", (contents) => yaml.load(contents));
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
  eleventyConfig.addWatchTarget("src/assets/css/**/*.css");
  eleventyConfig.addPassthroughCopy("src/admin/config.yml");
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/js");
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
  eleventyConfig.addCollection("events", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/events/*.md").sort((a, b) => {
      return new Date(a.data.date) - new Date(b.data.date);
    });
  });
  eleventyConfig.addCollection("blog_posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/blog/*.md").sort((a, b) => {
      return new Date(b.data.date) - new Date(a.data.date);
    });
  });
  eleventyConfig.addFilter("take", (arr, count) => (Array.isArray(arr) ? arr.slice(0, count) : []));
  eleventyConfig.addFilter("count", (arr) => (Array.isArray(arr) ? arr.length : 0));
  eleventyConfig.addFilter("gt", (a, b) => Number(a) > Number(b));
  eleventyConfig.addFilter("t", (key, lang, i18n) => {
    const locale = typeof lang === "string" && lang ? lang : "en";
    const dict = i18n && typeof i18n === "object" ? i18n : {};
    const localized = getByPath(dict[locale], key);
    if (localized !== undefined && localized !== null && localized !== "") return localized;
    const fallback = getByPath(dict.en, key);
    if (fallback !== undefined && fallback !== null && fallback !== "") return fallback;
    return key;
  });
  eleventyConfig.addFilter("eventDay", (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      timeZone: "UTC",
    }).format(date);
  });
  eleventyConfig.addFilter("eventMonth", (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      timeZone: "UTC",
    })
      .format(date)
      .toUpperCase();
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
