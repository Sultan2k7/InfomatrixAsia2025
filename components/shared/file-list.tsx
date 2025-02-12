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
      console.log(data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleFileAction = (file: FileInfo) => {
    const viewableTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/gif',
      'text/plain',
      'text/html'
    ];
    
    const url = `https://file.3gis.kz/file/view/${file.filename}`;
    if (viewableTypes.includes(file.contentType)) {
      window.open(url, '_blank');
    } else {
      // Force download for non-viewable files
      const link = document.createElement('a');
      link.href = url;
      link.download = file.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Доступные файлы</h3>
      {files.length > 0 ? (
        <ul className="list-disc pl-5">
          {files.map((file) => (
            <li key={file._id} className="flex justify-between items-center">
              <span>{file.filename}</span>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleFileAction(file)}
              >
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
