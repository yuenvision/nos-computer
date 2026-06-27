const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  /* Read .yml/.yaml data files (Eleventy handles JSON/JS natively, not YAML). */
  eleventyConfig.addDataExtension("yaml,yml", (contents) => yaml.load(contents));

  /* Copy assets straight through to the build output, untouched. */
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  /* tel: href from a display phone like "(520) 989-3700" -> "+15209893700" */
  eleventyConfig.addFilter("telLink", (phone) => {
    const digits = String(phone || "").replace(/\D/g, "");
    return "+1" + digits.replace(/^1/, "");
  });

  /* filter a list of objects by a key === value (used to join prices to services) */
  eleventyConfig.addFilter("where", (arr, key, value) =>
    (arr || []).filter((item) => item && item[key] === value)
  );

  /* current year for the footer copyright */
  eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));

  return {
    dir: { input: "src", output: "_site", data: "_data" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
