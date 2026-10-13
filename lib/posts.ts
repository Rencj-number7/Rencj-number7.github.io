import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  description?: string;
  date: string;
  category: string;
  tags: string[];
  draft: boolean;
};

function formatDate(value: unknown): string {
  if (value instanceof Date) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const raw = String(value ?? "").trim();
  const match = raw.match(/^(\d{4})(?:-(\d{1,2}))?(?:-(\d{1,2}))?(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2})?)?$/);
  if (!match) return raw;
  const [, year, month, day] = match;
  return [year, month, day].filter(Boolean).map((part, index) => index === 0 ? part : part!.padStart(2, "0")).join("-");
}
async function markdownFiles(directory: string, prefix = ""): Promise<string[]> { 
    const entries = await fs.readdir(directory, { withFileTypes: true }); const files: string[] = []; 
    for (const entry of entries) { 
        const relative = path.join(prefix, entry.name); 
        if (entry.isDirectory()) files.push(...await markdownFiles(path.join(directory, entry.name), relative)); 
        else if (entry.isFile() && entry.name.endsWith(".md")) files.push(relative); 
    } 
    return files; 
}
export async function getPosts(): Promise<Post[]> { 
    const root = path.join(process.cwd(), "content"); 
    const files = await markdownFiles(root); 
    const posts = await Promise.all(files.filter((file) => file !== "about.md").map(async (file) => { 
        const raw = await fs.readFile(path.join(root, file), "utf8"); 
    const { data } = matter(raw); const slug = file.replace(/\\/g, "/").replace(/\.md$/, "");
        const tags = Array.isArray(data.tags) ? data.tags.map(String) : []; 
        const category = String(data.category ?? data.categories ?? tags[0] ?? "未分类"); 
        const description = typeof data.description === "string" && data.description.trim() ? data.description.trim() : undefined;
        return { slug, title: String(data.title ?? slug), description, date: formatDate(data.date), category, tags, draft: data.draft === true };
    })); 
  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0));
}
