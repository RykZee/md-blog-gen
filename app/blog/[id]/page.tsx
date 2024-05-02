import path from "path";
import * as fs from "fs";

export default function Page({ params }: { params: { id: string } }) {
  const postsDirectory = path.join(process.cwd(), "app/posts");
  const fullPath = path.join(postsDirectory, `${params.id}.html`);
  const content = fs.readFileSync(fullPath, "utf-8");

  return (
    <div>
      <h1>{params.id}</h1>
      <div
        className="text-black dark:text-slate-400"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
}
