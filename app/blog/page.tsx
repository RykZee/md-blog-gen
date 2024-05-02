import path from "path";
import * as fs from "fs";

export default function Page() {
  const postsDirectory = path.join(process.cwd(), "app/posts");
  const allPosts = fs.readdirSync(postsDirectory);
  const data = allPosts.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const content = fs.readFileSync(fullPath, "utf-8");

    return {
      fileName,
      content,
    };
  });

  return (
    <div>
      <ul>
        {data.map(
          ({ fileName, content }: { fileName: string; content: string }) => (
            <li key={fileName}>
              File name: {fileName}
              <p>Content: {content}</p>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
