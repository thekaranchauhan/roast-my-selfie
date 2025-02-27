"use client";

import { useEffect, RefObject } from "react";

type ImageStretchProps = {
  file: File | null;
  canvasRef: RefObject<HTMLCanvasElement | null>;
};

export default function ImageStretch({ file, canvasRef }: ImageStretchProps) {
  useEffect(() => {
    if (file && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height * 1.5;
        ctx?.drawImage(img, 0, 0, img.width, img.height * 1.5);
      };
    }
  }, [file, canvasRef]);

  return (
    <div className="mt-4">
      <canvas ref={canvasRef} className="max-w-xs rounded-md" />
    </div>
  );
}