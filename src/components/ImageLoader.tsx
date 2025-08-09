import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Blurhash } from "react-blurhash";

type ImageLoaderProps = {
  imageUrl: string;
  blurhash: string;
  width: number | string;
  height: number | string;
};

function ImageLoader({ imageUrl, blurhash, width, height }: ImageLoaderProps) {
  const [loading, setLoading] = useState(true);
  const toNum = (v: number | string) => (typeof v === "number" ? v : parseFloat(v));
  const initialW = toNum(width);
  const initialH = toNum(height);
  const [aspectRatio, setAspectRatio] = useState<string>(
    Number.isFinite(initialW) && Number.isFinite(initialH) && initialH > 0 ? `${initialW}/${initialH}` : "1 / 1"
  );
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setLoading(false);
    };
    image.src = imageUrl;
  }, [imageUrl]);

  useEffect(() => {
    const w = toNum(width);
    const h = toNum(height);
    setAspectRatio(Number.isFinite(w) && Number.isFinite(h) && h > 0 ? `${w}/${h}` : "1 / 1");
  }, [height, width]);

  const [wi, setWi] = useState(0);
  const [hi, setHi] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) {
      setWi(ref.current.offsetWidth);
      setHi(ref.current.offsetHeight);
    }
  }, []);

  return (
    <div style={{ aspectRatio, color: "blue" }} ref={ref}>
      {loading ? (
        <Blurhash hash={blurhash} width={wi || 100} height={hi || 100} resolutionX={64} resolutionY={64} punch={1} />
      ) : (
        <img src={imageUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
      )}
    </div>
  );
}

export default ImageLoader;