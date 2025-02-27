"use client";

import { useRef, useEffect } from "react";

type ImagePixelateProps = {
  file: File | null;
};

export default function ImagePixelate({ file }: ImagePixelateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (file && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        // Drawing at low resolution then scaling up
        const blockSize = 10; // Pixelation block size
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        tempCanvas.width = img.width / blockSize;
        tempCanvas.height = img.height / blockSize;
        tempCtx?.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
        ctx?.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, canvas.width, canvas.height);
      };
    }
  }, [file]);

  return (
    <div className="mt-4">
      <canvas ref={canvasRef} className="max-w-xs rounded-md" />
    </div>
  );
}