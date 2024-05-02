import path from "path";
import * as fs from "fs";
import Link from "next/link";
import clsx from "clsx";

export default function Page() {
  const postsDirectory = path.join(process.cwd(), "app/posts");
  const allPosts = fs.readdirSync(postsDirectory);
  const data = allPosts
    .filter((fileName) => fileName.endsWith(".html"))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const content = fs.readFileSync(fullPath, "utf-8");

      const fileNameWithoutExtension = fileName.replace(".html", "");
      const metaDataPromise = fs.readFileSync(
        `${postsDirectory}/${fileNameWithoutExtension}-meta.json`,
        "utf-8"
      );
      const { date, description } = JSON.parse(metaDataPromise);

      return {
        fileName,
        fileNameWithoutExtension,
        date,
        description,
        content,
      };
    });

  return (
    <div>
      <h1 className="mb-3 text-4xl font-semibold">Blog Posts</h1>
      <ul>
        {data.map(
          ({
            fileName,
            fileNameWithoutExtension,
            date,
            description,
            content,
          }: {
            fileName: string;
            fileNameWithoutExtension: string;
            date: string;
            description: string;
            content: string;
          }) => (
            <li key={fileName}>
              <Link
                key={fileName}
                href={`/blog/${fileNameWithoutExtension}`}
                className={clsx(
                  "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                )}
              >
                {fileNameWithoutExtension}
              </Link>
              <p>Date: {date}</p>
              <p>Description: {description}</p>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
