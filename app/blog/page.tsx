import path from "path";
import * as fs from "fs";
import Link from "next/link";
import clsx from "clsx";

export default function Page() {
  const postsDirectory = path.join(process.cwd(), "app", "posts");

  const data = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const fullPath = path.join(postsDirectory, file);
      const { title, date, description } = JSON.parse(
        fs.readFileSync(fullPath, "utf-8")
      );

      return {
        title,
        date,
        description,
      };
    });

  return (
    <div>
      <h1 className="mb-3 text-4xl font-semibold">Blog Posts</h1>
      <ul>
        {data.map(
          ({
            title,
            date,
            description,
          }: {
            title: string;
            date: string;
            description: string;
          }) => (
            <li key={title}>
              <Link
                key={title}
                href={`/blog/${title}`}
                className={clsx(
                  "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                )}
              >
                {title}
              </Link>
              <p>
                <b>Date: </b>
                {date}
              </p>
              <p>
                <b>Description: </b> {description}
              </p>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
