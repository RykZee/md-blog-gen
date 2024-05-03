import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";


const markdownDir = path.join(process.cwd(), "markdown");
const allMarkdownData = await fs.readdirSync(markdownDir).map(async (fileName) => {
  const fullPath = path.join(markdownDir, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf-8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    contentHtml,
    ...matterResult.data
  }
})

allMarkdownData.forEach(element => element.then(x => {
  const postsDir = path.join(process.cwd(), "app", "posts");
  fs.writeFileSync(`${postsDir}/${x.title}.html`, x.contentHtml);
  fs.writeFileSync(`${postsDir}/${x.title}-meta.json`, JSON.stringify({title: x.title, date: x.date, description: x.description}));
}));