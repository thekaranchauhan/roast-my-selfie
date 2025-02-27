"use client";

import { useRef, useEffect } from "react";

type ImageStretchProps = {
  file: File | null;
};

export default function ImageStretch({ file }: ImageStretchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (file && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height * 1.5; // Stretching height by 50%
        ctx?.drawImage(img, 0, 0, img.width, img.height * 1.5);
      };
    }
  }, [file]);

  return (
    <div className="mt-4">
      <canvas ref={canvasRef} className="max-w-xs rounded-md" />
    </div>
  );
}