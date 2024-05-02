import path from "path";
import * as fs from "fs";

export default function Page({ params }: { params: { id: string } }) {
  const filePath = path.join(
    process.cwd(),
    "app",
    "posts",
    `${params.id}.html`
  );
  const content = fs.readFileSync(filePath, "utf-8");

  return (
    <div>
      <h1 className="mb-3 text-4xl font-semibold">{params.id}</h1>
      <div
        className="text-black dark:text-slate-400"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
}
