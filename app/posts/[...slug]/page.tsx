import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { getPosts } from "../../../lib/posts";
import { rehypeContentImages } from "../../../lib/rehype-content-images";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug.split("/") }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const postKey = slug.join("/");
  const post = (await getPosts()).find((item) => item.slug === postKey);
  if (!post) notFound();
  const source = await fs.readFile(path.join(process.cwd(), "content", ...slug) + ".md", "utf8");
  const assetSlug = post.slug.endsWith("/index") ? post.slug.slice(0, -"/index".length) : post.slug.includes("/") ? post.slug.slice(0, post.slug.lastIndexOf("/")) : "";
  const { content } = await compileMDX({ source, options: { parseFrontmatter: true, mdxOptions: { format: "md", remarkPlugins: [remarkGfm, remarkMath], rehypePlugins: [[rehypeContentImages, { assetBase: assetSlug }], rehypeKatex] } } });
  return <main className="container page narrow"><Link className="back-link" href="/posts">← 所有文章</Link><p className="post-date">{post.date}</p><h1>{post.title}</h1><div className="tags">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><article className="prose article-body">{content}</article></main>;
}
