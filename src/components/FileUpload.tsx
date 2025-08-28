import React, { useCallback, useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (content: string, filename: string) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file.name.endsWith('.txt')) {
      setError('Por favor, selecciona un archivo .txt');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const content = await file.text();
      onFileSelect(content, file.name);
    } catch (err) {
      setError('Error al leer el archivo');
    } finally {
      setIsLoading(false);
    }
  }, [onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`
          border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
          ${isDragOver 
            ? 'border-purple-500 bg-purple-50 scale-105' 
            : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
          }
          ${isLoading ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col items-center space-y-4">
          {isLoading ? (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          ) : (
            <Upload className={`h-12 w-12 ${isDragOver ? 'text-purple-600' : 'text-gray-400'}`} />
          )}
          
          <div>
            <p className="text-lg font-semibold text-gray-700 mb-2">
              {isLoading ? 'Cargando archivo...' : 'Arrastra tu archivo aquí'}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              o haz clic para seleccionar un archivo .txt
            </p>
            
            <label className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg cursor-pointer hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
              <FileText className="w-5 h-5 mr-2" />
              Seleccionar Archivo
              <input
                type="file"
                accept=".txt"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}