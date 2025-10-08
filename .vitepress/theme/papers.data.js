import { createContentLoader } from "vitepress";

export default createContentLoader("nju/papers/*.md", {
  transform: (raw) => {
    return raw
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title,
        date: frontmatter.date,
        authors: frontmatter.authors,
        journal: frontmatter.journal,
        link: frontmatter.link,
        image: frontmatter.image,
        keywords: frontmatter.keywords,
        url,
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  },
});
