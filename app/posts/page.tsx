import PostArchive from "../../components/PostArchive";
import { getPosts } from "../../lib/posts";

export default async function PostsPage() {
  const posts = await getPosts();
  return <main className="container page"><p className="eyebrow">Archive</p><h1>所有文章</h1><p className="lede">一些日常记录、竞赛复盘和正在形成的观点。</p><PostArchive posts={posts} /></main>;
}
