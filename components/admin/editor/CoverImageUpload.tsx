"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { uploadImage } from "./upload-image";

export function CoverImageUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, "blog-covers");
      onChange(url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files?.[0]);
        }}
        onClick={() => inputRef.current?.click()}
        className="flex h-40 w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border border-dashed border-neutral-700 bg-neutral-950 text-sm text-neutral-500 hover:border-neutral-500"
      >
        {uploading ? (
          "Uploading..."
        ) : value ? (
          <Image src={value} alt="Cover" width={640} height={160} className="h-full w-full object-cover" unoptimized />
        ) : (
          "Click or drop an image to set the cover"
        )}
      </div>
    </div>
  );
}
