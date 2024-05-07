import path from "path";
import fs from "fs";
import matter from "gray-matter";
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'


const markdownDir = path.join(process.cwd(), "markdown");
const allMarkdownData = await fs.readdirSync(markdownDir).map(async (fileName) => {
  const fullPath = path.join(markdownDir, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf-8");

  const matterResult = matter(fileContents);

  const contentHtml = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(matterResult.content);

  return {
    contentHtml,
    ...matterResult.data
  }
})

allMarkdownData.forEach(element => element.then(x => {
  const postsDir = path.join(process.cwd(), "app", "posts");
  fs.writeFileSync(`${postsDir}/${x.title}.html`, String(x.contentHtml));
  fs.writeFileSync(`${postsDir}/${x.title}-meta.json`, JSON.stringify({title: x.title, date: x.date, description: x.description}));
}));