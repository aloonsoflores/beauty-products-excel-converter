import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { FilePreview } from './components/FilePreview';
import { ProcessingResults } from './components/ProcessingResults';
import { parseProductsText } from './utils/textParser';
import { ParseResult } from './types/Product';

type Step = 'upload' | 'preview' | 'results';

function App() {
  const [step, setStep] = useState<Step>('upload');
  const [fileContent, setFileContent] = useState<string>('');
  const [filename, setFilename] = useState<string>('');
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);

  const handleFileSelect = (content: string, name: string) => {
    setFileContent(content);
    setFilename(name);
    setStep('preview');
  };

  const handleProcessFile = () => {
    const result = parseProductsText(fileContent);
    setParseResult(result);
    setStep('results');
  };

  const handleStartOver = () => {
    setStep('upload');
    setFileContent('');
    setFilename('');
    setParseResult(null);
  };

  const renderStepIndicator = () => {
    const steps = [
      { key: 'upload', label: 'Subir Archivo' },
      { key: 'preview', label: 'Vista Previa' },
      { key: 'results', label: 'Convertir' }
    ];

    return (
      <div className="flex items-center justify-center space-x-4 mb-8">
        {steps.map((s, index) => (
          <React.Fragment key={s.key}>
            <div className={`
              flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm
              ${step === s.key 
                ? 'bg-purple-600 text-white' 
                : steps.findIndex(step_item => step_item.key === step) > index
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }
            `}>
              {index + 1}
            </div>
            <span className={`text-sm font-medium ${
              step === s.key ? 'text-purple-600' : 'text-gray-500'
            }`}>
              {s.label}
            </span>
            {index < steps.length - 1 && (
              <ArrowRight className="w-4 h-4 text-gray-400" />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-2">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Conversor de Productos de Belleza
              </h1>
              <p className="text-gray-600 text-sm">
                Convierte listas de productos de texto a Excel estructurado
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderStepIndicator()}

        <div className="space-y-8">
          {step === 'upload' && (
            <div className="text-center space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Sube tu archivo de productos
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Selecciona un archivo .txt con tu lista de productos de belleza y cosmética.
                  El sistema detectará automáticamente las categorías y extraerá toda la información relevante.
                </p>
              </div>
              <FileUpload onFileSelect={handleFileSelect} />
            </div>
          )}

          {step === 'preview' && fileContent && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Revisa tu archivo
                </h2>
                <p className="text-gray-600 text-lg">
                  Verifica que el contenido sea correcto antes de proceder con la conversión.
                </p>
              </div>
              
              <FilePreview content={fileContent} filename={filename} />
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleStartOver}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cambiar Archivo
                </button>
                <button
                  onClick={handleProcessFile}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                >
                  Procesar y Convertir
                </button>
              </div>
            </div>
          )}

          {step === 'results' && parseResult && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Conversión Completada
                </h2>
                <p className="text-gray-600 text-lg">
                  Tu archivo ha sido procesado exitosamente. Revisa los resultados y descarga el Excel.
                </p>
              </div>

              <ProcessingResults 
                result={parseResult} 
                onDownload={() => {
                  setTimeout(() => {
                    if (window.confirm('¿Deseas procesar otro archivo?')) {
                      handleStartOver();
                    }
                  }, 1000);
                }}
              />

              <div className="text-center">
                <button
                  onClick={handleStartOver}
                  className="px-6 py-3 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  Procesar Otro Archivo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>Conversor de Productos de Belleza - Procesa fácilmente tus catálogos de productos</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;