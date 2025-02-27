"use client";

import { useEffect, RefObject } from "react";

type ImageMirrorProps = {
  file: File | null;
  canvasRef: RefObject<HTMLCanvasElement | null>;
};

export default function ImageMirror({ file, canvasRef }: ImageMirrorProps) {
  useEffect(() => {
    if (file && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.scale(-1, 1);
        ctx?.drawImage(img, -img.width, 0);
      };
    }
  }, [file, canvasRef]);

  return (
    <div className="mt-4">
      <canvas ref={canvasRef} className="max-w-xs rounded-md" />
    </div>
  );
}