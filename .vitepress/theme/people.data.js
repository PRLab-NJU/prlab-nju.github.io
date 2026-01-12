import { createContentLoader } from "vitepress";

export default createContentLoader("/nju/people/**/*.md", {
  transform: (raw) => {
    return raw
      .filter(({ url }) => !url.endsWith('/index.html') && !url.endsWith('index.html'))
      .map(({ url, frontmatter, subtext }) => ({
        name: frontmatter.name,
        image: frontmatter.image,
        title: frontmatter.title,
        category: frontmatter.category,
        desc: frontmatter.desc,
        briefIntro: frontmatter['brief-intro'],
        biography: frontmatter.biography,
        links: frontmatter.links,
        socials: frontmatter.socials,
        phone: frontmatter.phone,
        address: frontmatter.address,
        office: frontmatter.office,
        email: frontmatter.email,
        emails: frontmatter.emails,
        url,
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  },
});
