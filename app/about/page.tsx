import fs from "node:fs/promises";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default async function AboutPage() {
  const source = await fs.readFile(path.join(process.cwd(), "content", "about.md"), "utf8");
  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true, mdxOptions: { format: "md", remarkPlugins: [remarkGfm, remarkMath], rehypePlugins: [rehypeKatex] } },
  });
  return <main className="container page narrow"><p className="eyebrow">About</p><h1>你好，我是一个<br /><em>喜欢把事情做清楚的人。</em></h1><div className="prose">{content}</div></main>;
}
