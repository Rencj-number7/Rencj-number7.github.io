"use client";

import { useState } from "react";
import type { TocItem } from "../lib/table-of-contents";

function TocBranch({ items, depth = 0 }: { items: TocItem[]; depth?: number }) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  return <ul className={`toc-list toc-depth-${depth}`}>{items.map((item) => {
    const isCollapsed = collapsed[item.id] ?? false;
    return <li key={item.id}>
      <div className="toc-row"><a href={`#${item.id}`} title={item.title}>{item.title}</a>{item.children.length > 0 && <button type="button" className="toc-toggle" aria-label={`${isCollapsed ? "展开" : "收起"}${item.title}`} aria-expanded={!isCollapsed} onClick={() => setCollapsed((state) => ({ ...state, [item.id]: !isCollapsed }))}>{isCollapsed ? "+" : "−"}</button>}</div>
      {item.children.length > 0 && !isCollapsed && <TocBranch items={item.children} depth={depth + 1} />}
    </li>;
  })}</ul>;
}

export default function ArticleToc({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(true);
  if (items.length === 0) return null;
  return <aside className="article-toc"><div className="toc-heading"><span>文章大纲</span><button type="button" className="toc-panel-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "收起文章大纲" : "展开文章大纲"}>{open ? "−" : "+"}</button></div>{open && <nav aria-label="文章大纲"><TocBranch items={items} /></nav>}</aside>;
}
