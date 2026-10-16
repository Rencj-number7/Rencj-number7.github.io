type ImageNode = { type: string; tagName?: string; properties?: { src?: string; href?: string; target?: string; rel?: string[]; className?: string[] } };
type Tree = { children?: ImageNode[] };

export function rehypeContentImages(options: { assetBase: string }) {
  return (tree: Tree) => {
    const visit = (node: Tree | ImageNode) => {
      const image = node as ImageNode;
      const source = image.properties?.src;
      const href = image.properties?.href;
      const url = source ?? href;
      if (image.type === "element" && (image.tagName === "img" || image.tagName === "a") && url && !/^(?:[a-z][a-z\d+.-]*:|\/\/|\/|#|data:)/i.test(url)) {
        const base = options.assetBase ? `${options.assetBase}/` : "";
        const rewritten = `/content/${base}${url.split("/").map((part) => encodeURIComponent(decodeURIComponent(part))).join("/")}`;
        if (image.tagName === "img") image.properties!.src = rewritten;
        else image.properties!.href = rewritten;
      }
      if (image.type === "element" && image.tagName === "a" && image.properties?.href?.toLowerCase().split("?")[0].endsWith(".pdf")) {
        image.properties.target = "_blank";
        image.properties.rel = ["noopener", "noreferrer"];
        image.properties.className = ["pdf-link"];
      }
      for (const child of (node as Tree).children ?? []) visit(child);
    };
    visit(tree);
  };
}
