import { useEffect, useState } from "react";
import GalleryBlock from "./GalleryBlock";

export default function GalleryPage({ slug, title }) {
  const [blocks, setBlocks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "/");
    const url = `${base}gallery/${slug}.json`;
    console.log("[GalleryPage] fetch: ", url);
    (async () => {
      try {
        const r = await fetch(url, { cache: "no-store" });

        // if server gave us HTML, throw error:
        const ct = r.headers.get("content-type") || "";
        if (!r.ok || ct.includes("text/html")) {
          const txt = await r.text();
          throw new Error(`Fetch ${url} → ${r.status}\n${txt.slice(0, 200)}`);
        }
        const data = await r.json();
        setBlocks(data);
      } catch (e) {
        console.error(e);
        setError(e.message);
      }
    })();
  }, [slug]);
  return (
    <section className="container gallery-page">
      <header className="page-header">
        <h1>{title}</h1>
      </header>
      {error ? (
        <pre style={{ color: "crimson", whiteSpace: "pre-wrap" }}>
          Load error: {error}
        </pre>
      ) : (
        <div className="gallery-stream">
          {blocks.map((b) => (
            <GalleryBlock key={b.id} block={b} />
          ))}
        </div>
      )}
    </section>
  );
}
