"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface FileUploadProps {
  driverId: string;
}

export default function FileUpload({ driverId }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(`/api/files/upload/${driverId}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      setMessage("Файл успешно загружен");
      setSelectedFile(null);
    } catch (error) {
      setMessage("Ошибка загрузки файла");
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Загрузить файл</h3>
      <input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload} className="ml-2">
        <Upload className="mr-2 h-4 w-4" /> Загрузить
      </Button>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
