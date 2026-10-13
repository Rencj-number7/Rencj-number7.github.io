import GithubSlugger from "github-slugger";

export type TocItem = { id: string; title: string; level: number; children: TocItem[] };

export function getTableOfContents(markdown: string): TocItem[] {
  const withoutFencedCode = markdown.replace(/^\s*(```|~~~)[^\n]*\n[\s\S]*?^\s*\1\s*$/gm, "");
  const slugger = new GithubSlugger();
  const roots: TocItem[] = [];
  const stack: TocItem[] = [];
  for (const match of withoutFencedCode.matchAll(/^ {0,3}(#{1,6})\s+(.+?)\s*#*\s*$/gm)) {
    const level = match[1].length;
    const title = match[2].replace(/\s+#+\s*$/, "").trim();
    const plainTitle = title.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[`*_~]/g, "").trim();
    const item: TocItem = { id: slugger.slug(plainTitle), title: plainTitle, level, children: [] };
    while (stack.length && stack[stack.length - 1].level >= level) stack.pop();
    if (stack.length) stack[stack.length - 1].children.push(item);
    else roots.push(item);
    stack.push(item);
  }
  return roots;
}
