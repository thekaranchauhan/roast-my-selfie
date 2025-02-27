"use client";

import { useState } from "react";
import { FaUpload } from "react-icons/fa6";
import ImageBulge from "./components/ImageBulge";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
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
        {file && <ImageBulge file={file} />}
      </div>
    </main>
  );
}