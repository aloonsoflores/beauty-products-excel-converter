import React from 'react';
import { Eye, FileText } from 'lucide-react';

interface FilePreviewProps {
  content: string;
  filename: string;
}

export function FilePreview({ content, filename }: FilePreviewProps) {
  const lines = content.split('\n').slice(0, 20); // Show first 20 lines
  const hasMore = content.split('\n').length > 20;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Vista Previa</h3>
            <span className="text-sm text-gray-500">({filename})</span>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            {lines.map((line, index) => (
              <div 
                key={index} 
                className={`py-1 px-2 rounded ${
                  line.trim().endsWith(':') && !line.startsWith('-') 
                    ? 'bg-purple-100 text-purple-800 font-semibold' 
                    : line.startsWith('-') 
                      ? 'bg-blue-50 text-blue-800' 
                      : 'text-gray-700'
                }`}
              >
                {line || '\u00A0'}
              </div>
            ))}
            {hasMore && (
              <div className="text-gray-500 italic mt-2 text-center">
                ... y {content.split('\n').length - 20} líneas más
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
            <Eye className="w-4 h-4" />
            <span>Mostrando las primeras {Math.min(20, content.split('\n').length)} líneas</span>
          </div>
        </div>
      </div>
    </div>
  );
}