"use client";

import { useState } from "react";
import { FaUpload } from "react-icons/fa6";
import ImageBulge from "./components/ImageBulge";
import ImageStretch from "./components/ImageStretch";
import ImagePixelate from "./components/ImagePixelate";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [filter, setFilter] = useState<"bulge" | "stretch" | "pixelate" | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFilter("bulge"); // Default to bulge on upload
    }
  };

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
          <>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setFilter("bulge")}
                className={`px-4 py-2 rounded-md ${
                  filter === "bulge" ? "bg-red-600" : "bg-gray-600"
                } hover:bg-red-700 transition-colors`}
              >
                Bulge
              </button>
              <button
                onClick={() => setFilter("stretch")}
                className={`px-4 py-2 rounded-md ${
                  filter === "stretch" ? "bg-red-600" : "bg-gray-600"
                } hover:bg-red-700 transition-colors`}
              >
                Stretch
              </button>
              <button
                onClick={() => setFilter("pixelate")}
                className={`px-4 py-2 rounded-md ${
                  filter === "pixelate" ? "bg-red-600" : "bg-gray-600"
                } hover:bg-red-700 transition-colors`}
              >
                Pixelate
              </button>
            </div>
            <div className="mt-4">
              {filter === "bulge" && <ImageBulge file={file} />}
              {filter === "stretch" && <ImageStretch file={file} />}
              {filter === "pixelate" && <ImagePixelate file={file} />}
            </div>
          </>
        )}
      </div>
    </main>
  );
}