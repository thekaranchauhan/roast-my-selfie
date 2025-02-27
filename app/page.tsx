"use client";

import { useState, useRef } from "react";
import { FaUpload } from "react-icons/fa6";
import ImageBulge from "./components/ImageBulge";
import ImageStretch from "./components/ImageStretch";
import ImagePixelate from "./components/ImagePixelate";
import ImageWave from "./components/ImageWave";
import ImageMirror from "./components/ImageMirror";
import ImageInvert from "./components/ImageInvert";
import ImageGlitch from "./components/ImageGlitch";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [filter, setFilter] = useState<
    "bulge" | "stretch" | "pixelate" | "wave" | "mirror" | "invert" | "glitch" | null
  >(null);
  const canvasRefs = {
    bulge: useRef<HTMLCanvasElement>(null),
    stretch: useRef<HTMLCanvasElement>(null),
    pixelate: useRef<HTMLCanvasElement>(null),
    wave: useRef<HTMLCanvasElement>(null),
    mirror: useRef<HTMLCanvasElement>(null),
    invert: useRef<HTMLCanvasElement>(null),
    glitch: useRef<HTMLCanvasElement>(null),
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFilter("bulge"); // Default to bulge on upload
    }
  };

  const handleDownload = () => {
    if (filter && canvasRefs[filter].current) {
      const canvas = canvasRefs[filter].current;
      const link = document.createElement("a");
      link.download = `roasted-selfie-${filter}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Roast My Selfie</h1>
      {file && (
        <div className="flex flex-wrap gap-2 mb-8">
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
          <button
            onClick={() => setFilter("wave")}
            className={`px-4 py-2 rounded-md ${
              filter === "wave" ? "bg-red-600" : "bg-gray-600"
            } hover:bg-red-700 transition-colors`}
          >
            Wave
          </button>
          <button
            onClick={() => setFilter("mirror")}
            className={`px-4 py-2 rounded-md ${
              filter === "mirror" ? "bg-red-600" : "bg-gray-600"
            } hover:bg-red-700 transition-colors`}
          >
            Mirror
          </button>
          <button
            onClick={() => setFilter("invert")}
            className={`px-4 py-2 rounded-md ${
              filter === "invert" ? "bg-red-600" : "bg-gray-600"
            } hover:bg-red-700 transition-colors`}
          >
            Invert
          </button>
          <button
            onClick={() => setFilter("glitch")}
            className={`px-4 py-2 rounded-md ${
              filter === "glitch" ? "bg-red-600" : "bg-gray-600"
            } hover:bg-red-700 transition-colors`}
          >
            Glitch
          </button>
        </div>
      )}
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
        {file && filter && (
          <div className="mt-4">
            {filter === "bulge" && <ImageBulge file={file} canvasRef={canvasRefs.bulge} />}
            {filter === "stretch" && <ImageStretch file={file} canvasRef={canvasRefs.stretch} />}
            {filter === "pixelate" && <ImagePixelate file={file} canvasRef={canvasRefs.pixelate} />}
            {filter === "wave" && <ImageWave file={file} canvasRef={canvasRefs.wave} />}
            {filter === "mirror" && <ImageMirror file={file} canvasRef={canvasRefs.mirror} />}
            {filter === "invert" && <ImageInvert file={file} canvasRef={canvasRefs.invert} />}
            {filter === "glitch" && <ImageGlitch file={file} canvasRef={canvasRefs.glitch} />}
            <button
              onClick={handleDownload}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Download
            </button>
          </div>
        )}
      </div>
    </main>
  );
}