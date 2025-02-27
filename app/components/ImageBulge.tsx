"use client";

import { useRef, useEffect } from "react";

type ImageDisplayProps = {
  file: File | null;
};

export default function ImageBulge({ file }: ImageDisplayProps) {
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

        // Drawing original image
        ctx?.drawImage(img, 0, 0);

        // Getting image data
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        if (!imageData) return;
        const data = imageData.data;

        // Applying bulge distortion
        const distortedData = new ImageData(canvas.width, canvas.height);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
        const strength = 0.3; // Distortion strength

        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const dx = x - centerX;
            const dy = y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const distortion = (1 + strength * (1 - distance / maxDist)) ** 2;

            const srcX = centerX + (dx / distortion);
            const srcY = centerY + (dy / distortion);

            const srcIdx =
              (Math.floor(srcY) * canvas.width + Math.floor(srcX)) * 4;
            const destIdx = (y * canvas.width + x) * 4;

            if (
              srcX >= 0 &&
              srcX < canvas.width &&
              srcY >= 0 &&
              srcY < canvas.height
            ) {
              distortedData.data[destIdx] = data[srcIdx];     // Red
              distortedData.data[destIdx + 1] = data[srcIdx + 1]; // Green
              distortedData.data[destIdx + 2] = data[srcIdx + 2]; // Blue
              distortedData.data[destIdx + 3] = data[srcIdx + 3]; // Alpha
            }
          }
        }

        // Putting distorted image back on canvas
        ctx?.putImageData(distortedData, 0, 0);
      };
    }
  }, [file]);

  return (
    <div className="mt-4">
      <canvas ref={canvasRef} className="max-w-xs rounded-md" />
    </div>
  );
}