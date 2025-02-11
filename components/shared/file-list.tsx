"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface FileInfo {
  _id: string;
  filename: string;
  contentType: string;
}

interface FileListProps {
  driverId: string;
}

export default function FileList({ driverId }: FileListProps) {
  const [files, setFiles] = useState<FileInfo[]>([]);

  useEffect(() => {
    fetchFiles();
  }, [driverId]);

  const fetchFiles = async () => {
    try {
      const response = await fetch(`/api/files/${driverId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch files");
      }
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Доступные файлы</h3>
      {files.length > 0 ? (
        <ul className="list-disc pl-5">
          {files.map((file) => (
            <li key={file._id} className="flex justify-between items-center">
              <a href={`/api/files/view/${file.filename}`} target="_blank" rel="noopener noreferrer">
                {file.filename}
              </a>
              <Button size="sm" variant="outline" onClick={() => window.open(`/api/files/view/${file.filename}`, "_blank")}>
                <Eye className="mr-2 h-4 w-4" /> Открыть
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет загруженных файлов.</p>
      )}
    </div>
  );
}
