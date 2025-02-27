"use client";

import { useEffect, RefObject } from "react";

type ImageWaveProps = {
  file: File | null;
  canvasRef: RefObject<HTMLCanvasElement | null>;
};

export default function ImageWave({ file, canvasRef }: ImageWaveProps) {
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

        const wavedData = new ImageData(canvas.width, canvas.height);
        const amplitude = 10;
        const frequency = 0.05;

        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const offsetY = Math.sin(x * frequency) * amplitude;
            const srcY = Math.floor(y + offsetY);
            const srcIdx =
              ((srcY >= 0 && srcY < canvas.height ? srcY : y) * canvas.width + x) * 4;
            const destIdx = (y * canvas.width + x) * 4;

            wavedData.data[destIdx] = data[srcIdx];
            wavedData.data[destIdx + 1] = data[srcIdx + 1];
            wavedData.data[destIdx + 2] = data[srcIdx + 2];
            wavedData.data[destIdx + 3] = data[srcIdx + 3];
          }
        }
        ctx?.putImageData(wavedData, 0, 0);
      };
    }
  }, [file, canvasRef]);

  return (
    <div className="mt-4">
      <canvas ref={canvasRef} className="max-w-xs rounded-md" />
    </div>
  );
}