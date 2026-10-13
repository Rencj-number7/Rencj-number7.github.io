"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type ImageItem = { src: string; alt: string };
type GalleryContextValue = { open: (image: ImageItem) => void };
const GalleryContext = createContext<GalleryContextValue | null>(null);

export function ImageLightbox({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const open = (image: ImageItem) => {
    const articleImages = Array.from(document.querySelectorAll<HTMLImageElement>(".article-image-button img")).map((item) => ({ src: item.currentSrc || item.src, alt: item.alt }));
    const selectedSrc = image.src;
    setImages(articleImages);
    setActive(Math.max(0, articleImages.findIndex((item) => item.src === selectedSrc || item.src.endsWith(new URL(selectedSrc, window.location.href).pathname))));
  };
  const close = () => setActive(null);
  const move = (step: number) => setActive((current) => current === null || images.length === 0 ? current : (current + step + images.length) % images.length);

  useEffect(() => {
    if (active === null) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") close(); if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1); };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; };
  }, [active, images.length]);

  const current = active === null ? null : images[active];
  return <GalleryContext.Provider value={{ open }}>{children}{current && active !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="图片预览" onClick={close}><button className="lightbox-close" onClick={close} aria-label="关闭预览">×</button>{images.length > 1 && <button className="lightbox-nav lightbox-prev" onClick={(event) => { event.stopPropagation(); move(-1); }} aria-label="上一张">‹</button>}<img src={current.src} alt={current.alt} onClick={(event) => event.stopPropagation()} />{images.length > 1 && <button className="lightbox-nav lightbox-next" onClick={(event) => { event.stopPropagation(); move(1); }} aria-label="下一张">›</button>}<span className="lightbox-count">{active + 1} / {images.length}</span></div>}</GalleryContext.Provider>;
}

export function ArticleImage({ src = "", alt = "" }: { src?: string; alt?: string }) {
  const gallery = useContext(GalleryContext);
  const image = { src, alt };
  return <button className="article-image-button" type="button" onClick={() => gallery?.open(image)} aria-label="点击放大图片"><img src={src} alt={alt} /></button>;
}
