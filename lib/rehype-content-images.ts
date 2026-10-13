type ImageNode = { type: string; tagName?: string; properties?: { src?: string } };
type Tree = { children?: ImageNode[] };

export function rehypeContentImages(options: { assetBase: string }) {
  return (tree: Tree) => {
    const visit = (node: Tree | ImageNode) => {
      const image = node as ImageNode;
      const src = image.properties?.src;
      if (image.type === "element" && image.tagName === "img" && src && !/^(?:[a-z][a-z\d+.-]*:|\/\/|\/|#|data:)/i.test(src)) {
        const base = options.assetBase ? `${options.assetBase}/` : "";
        image.properties!.src = `/content/${base}${src.split("/").map((part) => encodeURIComponent(decodeURIComponent(part))).join("/")}`;
      }
      for (const child of (node as Tree).children ?? []) visit(child);
    };
    visit(tree);
  };
}
