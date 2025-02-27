"use client";

import { useState, useRef, useEffect } from "react";
import { FaUpload } from "react-icons/fa6";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

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
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Roast My Selfie</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <label className="flex items-center gap-2 cursor-pointer">
          <FaUpload className="text-gray-300" />
          <span className="text-gray-300">Upload a Selfie</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {file && (
          <div className="mt-4">
            <canvas ref={canvasRef} className="max-w-xs rounded-md" />
          </div>
        )}
      </div>
    </main>
  );
}