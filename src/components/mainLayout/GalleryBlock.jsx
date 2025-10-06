import { useState } from "react";
import Lightbox from "../Lightbox";
import "./gallery.css";

export default function GalleryBlock({ block }) {
  const { layout = "single", images = [], caption } = block ?? {};
  const [preview, setPreview] = useState(null);

  const open = (img) => setPreview({ src: img.full.png, alt: img.alt || "" });
  const close = () => setPreview(null);

  if (layout === "pair") {
    return (
      <>
        <figure className="block pair">
          {images.slice(0, 2).map((img, i) => (
            <picture key={i} role="button" onClick={() => open(img)}>
              <source type="image/avif" srcSet={img.preview.avif} />
              <source type="image/webp" srcSet={img.preview.webp} />
              <img src={img.preview.jpeg} alt={img.alt || ""} loading="lazy" />
            </picture>
          ))}
          {caption ? <figcaption>{caption}</figcaption> : null}
        </figure>
        {preview && <Lightbox {...preview} onClose={close} />}
      </>
    );
  }
  // mosaic left - two pictures on the left side and one on the right
  if (layout === "mosaicLeft") {
    return (
      <>
        <figure className="block mosaicLeft">
          {images.slice(0, 3).map((img, i) => (
            <picture key={i} role="button" onClick={() => open(img)}>
              <source type="image/avif" srcSet={img.preview.avif} />
              <source type="image/webp" srcSet={img.preview.webp} />
              <img src={img.preview.jpeg} alt={img.alt || ""} loading="lazy" />
            </picture>
          ))}
          {caption ? <figcaption>{caption}</figcaption> : null}
        </figure>
        {preview && <Lightbox {...preview} onClose={close} />}
      </>
    );
  }

  // mosaic right - one picture on the right and two on the right
  if (layout === "mosaicRight") {
    return (
      <>
        <figure className="block mosaicRight">
          {images.slice(0, 3).map((img, i) => (
            <picture key={i} role="button" onClick={() => open(img)}>
              <source type="image/avif" srcSet={img.preview.avif} />
              <source type="image/webp" srcSet={img.preview.webp} />
              <img src={img.preview.jpeg} alt={img.alt || ""} loading="lazy" />
            </picture>
          ))}
          {caption ? <figcaption>{caption}</figcaption> : null}
        </figure>
        {preview && <Lightbox {...preview} onClose={close} />}
      </>
    );
  }

  //single
  return (
    <>
      <figure className="block single">
        <picture role="button" onClick={() => open(images[0])}>
          <source type="image/avif" srcSet={images[0].preview.avif} />
          <source type="image/webp" srcSet={images[0].preview.webp} />
          <img
            src={images[0].preview.jpeg}
            alt={images[0].alt || ""}
            loading="lazy"
          />
        </picture>
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
      {preview && <Lightbox {...preview} onClose={close} />}
    </>
  );
}
