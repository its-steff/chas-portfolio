module.exports = {
  layout: "components/pages/work-entry.hbs",
  locales: ["en", "no"],
  pagination: {
    data: "locales",
    size: 1,
    alias: "lang",
  },
  permalink: (data) => {
    const stem = data?.page?.filePathStem || "";
    if (!stem) return false;
    return data.lang === "no" ? `/no${stem}/` : `${stem}/`;
  },
};
