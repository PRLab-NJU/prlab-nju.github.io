import { createContentLoader } from "vitepress";

export default createContentLoader("/nju/contact/*.md", {
  transform: (raw) => {
    return raw
      .map(({ url, frontmatter }) => ({
        name: frontmatter.name,
        'update-date': frontmatter['update-date'],
        'target-student': frontmatter['target-student'],
        recruitmentLink: frontmatter.recruitmentLink,
        url,
      }))
      .filter(person => person.name); 
  },
});
