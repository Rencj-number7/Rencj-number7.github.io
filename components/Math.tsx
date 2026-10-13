import katex from "katex";

export function Math({ expression, display = false }: { expression: string; display?: boolean }) {
  const html = katex.renderToString(expression, { displayMode: display, throwOnError: false });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
