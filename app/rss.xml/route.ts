import { getPosts } from "../../lib/posts";
import { postHref } from "../../lib/paths";

const siteUrl = "https://blog.rencj.top";

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export const dynamic = "force-static";

export async function GET() {
  const posts = await getPosts();
  const items = posts.map((post) => {
    const link = `${siteUrl}${postHref(post.slug)}/`;
    const description = post.description ?? `${post.title} · ${post.category}`;
    const date = new Date(`${post.date}T00:00:00+08:00`).toUTCString();
    return `<item><title>${escapeXml(post.title)}</title><link>${escapeXml(link)}</link><guid isPermaLink="true">${escapeXml(link)}</guid><pubDate>${date}</pubDate><description>${escapeXml(description)}</description>${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("")}</item>`;
  }).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Rencj&apos;s Blog</title><link>${siteUrl}/</link><description>记录技术实践、阅读思考与持续学习。</description><language>zh-CN</language><lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
