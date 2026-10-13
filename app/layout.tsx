import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.rencj.top"),
  title: { default: "Rencj's Blog", template: "%s · Rencj's Blog" },
  description: "记录技术实践、阅读思考与持续学习。",
  icons: { icon: "/logo.jpg", apple: "/logo.jpg" },
  openGraph: { title: "Rencj's Blog", description: "记录技术实践、阅读思考与持续学习。", images: ["/social-preview.jpg"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const logoPath = "/logo.jpg";
  return <html lang="zh-CN"><body><header className="site-header"><div className="container nav"><Link className="brand" href="/"><img src={logoPath} alt="Rencj's Blog logo" />Rencj's Blog<span>．</span></Link><nav><Link href="/posts">文章</Link><Link href="/about">关于</Link></nav></div></header>{children}<footer className="site-footer"><div className="container footer-inner"><span>© 2026 Rencj's Blog</span><span></span></div></footer></body></html>;
}
