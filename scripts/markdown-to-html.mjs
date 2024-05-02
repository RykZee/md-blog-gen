import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";


const markdownDir = path.join(process.cwd(), "markdown");
const allMarkdownData = fs.readdirSync(markdownDir).map(async (fileName) => {
  const fullPath = path.join(markdownDir, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf-8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();
  console.log(contentHtml);

  return {
    contentHtml,
    ...matterResult.data
  }
})

//console.log(allMarkdownData.contentHtml);