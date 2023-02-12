import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import tailwind from "@astrojs/tailwind";
import remarkCodeTitles from "remark-code-titles";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkNotes from "./src/utils/notes";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), tailwind()],
  markdown: {
    remarkPlugins: [remarkToc, remarkCodeTitles, remarkNotes, remarkDirective],
    rehypePlugins: [
      rehypeSlug,
      [
        "rehype-autolink-headings",
        {
          behavior: "wrap",
        },
      ],
    ],
    shikiConfig: {
      theme: "vitesse-dark",
      wrap: true,
    },
  },
});
