export function postHref(slug: string): string {
  return `/posts/${slug.split("/").map((segment) => encodeURIComponent(segment)).join("/")}`;
}
