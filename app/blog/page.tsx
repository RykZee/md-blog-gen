import path from "path";
import * as fs from "fs";
import Link from "next/link";
import Image from "next/image";

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
      <ul className="space-y-6">
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
            <Link
              key={title}
              href={`/blog/${title}`}
              className="relative flex flex-col-reverse bg-slate-50 rounded-lg p-4 hover:bg-sky-100 hover:text-blue-600 dark:bg-slate-800 dark:highlight-white/5 max-w-xs"
            >
              <li key={title}>
                <h3 className="text-2xl font-semibold">{title}</h3>
                <p className="text-sm mb-3">
                  <b>Date: </b> {date}
                </p>
                <p>{description}</p>
              </li>
            </Link>
          )
        )}
      </ul>
      <Image
        className="inset-y-0 right-0"
        src="/blog.jpeg"
        alt="Blog image"
        width={400}
        height={800}
        priority
      />
    </div>
  );
}
