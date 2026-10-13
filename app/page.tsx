import Link from "next/link";
import { getPosts } from "../lib/posts";

export default async function Home() {
  const posts = (await getPosts()).slice(0, 4);
  return <main>
    <section className="hero container">
      <p className="eyebrow">个人博客 · 持续更新</p><h1>把想法写下来，<br /><em>让它们慢慢长出来。</em></h1>
      <p className="hero-copy">这里记录开发实践、工具探索和那些值得反复思考的小问题。</p>
      <div className="hero-actions">
        <Link className="button primary" href="/posts">阅读文章 
        <span>→</span></Link><Link className="text-link" href="/about">了解我</Link>
      </div>
    </section>
    <section className="container section">
      <div className="section-heading">
        <div><p className="eyebrow">Latest notes</p><h2>最近写了什么</h2></div>
        <Link className="text-link" href="/posts">查看全部 →</Link>
      </div>
      <div className="post-grid">{
        posts.map((post) => 
        <article className="post-card" key={post.slug}>
          <p className="post-date">{post.date}</p>
          <h3><Link href={`/posts/${post.slug}`}>{post.title}</Link></h3>{post.description && <p>{post.description}</p>}
          <div className="tags">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </article>)
        }
      </div>
    </section>
    <section className="container callout">
      <p className="eyebrow">Now</p>
      <h3>正在上课吃饭睡觉。</h3>
      <Link className="text-link" href="/about">更多关于我 →</Link>
    </section>
  </main>;
}
