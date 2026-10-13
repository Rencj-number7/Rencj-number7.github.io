"use client";

import { useRef, useState, type HTMLAttributes, type ReactNode } from "react";

type CodeBlockProps = HTMLAttributes<HTMLPreElement> & { children?: ReactNode };

export default function CodeBlock({ children, ...props }: CodeBlockProps) {
  const codeRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const child = children as React.ReactElement<{ className?: string }> | undefined;
  const languageClass = child?.props?.className ?? "";
  const language = languageClass.match(/language-([\w-]+)/)?.[1] ?? "code";

  async function copyCode() {
    const text = codeRef.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return <div className="code-block"><div className="code-block-toolbar"><span>{language}</span><button type="button" onClick={copyCode} aria-label="复制代码">{copied ? "已复制" : "复制"}</button></div><pre {...props} ref={codeRef}>{children}</pre></div>;
}
