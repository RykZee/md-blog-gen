import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./ui/home/navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "md-blog-gen",
  description: "Blog generator generating html from markdown and hosting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="flex v-screen flex-row md:flex-col md:overflow-hidden">
          <div className="flex-grow pt-3 md:overflow-y-auto md:px-12 md:py-20">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
