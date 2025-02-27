"use client";

import { useEffect, RefObject } from "react";

type ImageGlitchProps = {
  file: File | null;
  canvasRef: RefObject<HTMLCanvasElement | null>;
};

export default function ImageGlitch({ file, canvasRef }: ImageGlitchProps) {
  useEffect(() => {
    if (file && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        if (!imageData) return;
        const data = imageData.data;

        const glitchData = new ImageData(canvas.width, canvas.height);
        const offset = 10;

        for (let i = 0; i < data.length; i += 4) {
          const x = (i / 4) % canvas.width;
          const y = Math.floor(i / 4 / canvas.width);

          const redIdx = (y * canvas.width + Math.max(0, x - offset)) * 4;
          glitchData.data[i] = data[redIdx];

          glitchData.data[i + 1] = data[i + 1];

          const blueIdx = (y * canvas.width + Math.min(canvas.width - 1, x + offset)) * 4;
          glitchData.data[i + 2] = data[blueIdx];

          glitchData.data[i + 3] = data[i + 3];
        }
        ctx?.putImageData(glitchData, 0, 0);
      };
    }
  }, [file, canvasRef]);

  return (
    <div className="mt-4">
      <canvas ref={canvasRef} className="max-w-xs rounded-md" />
    </div>
  );
}