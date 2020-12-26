const withMDX = require("@next/mdx")({
  // Match file extensions for MDX compilation, only .mdx supported by default
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  // Have Next.js handle .mdx files in the pages directory as pages
  pageExtensions: ["js", "jsx", "mdx"],
});
