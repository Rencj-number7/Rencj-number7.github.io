import GithubSlugger from "github-slugger";

export type TocItem = { id: string; title: string; level: number; children: TocItem[] };

export function getTableOfContents(markdown: string): TocItem[] {
  const source = markdown.replace(/^---\s*\r?\n[\s\S]*?\r?\n---\s*(?:\r?\n|$)/, "");
  const slugger = new GithubSlugger();
  const roots: TocItem[] = [];
  const stack: TocItem[] = [];
  let fence: { marker: "`" | "~"; length: number } | null = null;
  for (const line of source.split(/\r?\n/)) {
    const fenceMatch = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (fenceMatch) {
      const marker = fenceMatch[1][0] as "`" | "~";
      if (!fence) fence = { marker, length: fenceMatch[1].length };
      else if (fence.marker === marker && fenceMatch[1].length >= fence.length) fence = null;
      continue;
    }
    if (fence) continue;

    // Require a heading marker and its text to be on the same line.
    const match = line.match(/^ {0,3}(#{1,6})[ \t]+(.+?)[ \t]*#*[ \t]*$/);
    if (!match) continue;
    const level = match[1].length;
    const title = match[2].trim();
    const plainTitle = title.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[`*_~]/g, "").trim();
    if (!plainTitle) continue;
    const item: TocItem = { id: slugger.slug(plainTitle), title: plainTitle, level, children: [] };
    while (stack.length && stack[stack.length - 1].level >= level) stack.pop();
    if (stack.length) stack[stack.length - 1].children.push(item);
    else roots.push(item);
    stack.push(item);
  }
  return roots;
}
