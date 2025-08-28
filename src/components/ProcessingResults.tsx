import React from 'react';
import { CheckCircle, AlertTriangle, Download, Package, Tag } from 'lucide-react';
import { ParseResult } from '../types/Product';
import { generateExcel } from '../utils/excelGenerator';

interface ProcessingResultsProps {
  result: ParseResult;
  onDownload?: () => void;
}

export function ProcessingResults({ result, onDownload }: ProcessingResultsProps) {
  const handleDownload = () => {
    generateExcel(result.products);
    onDownload?.();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Statistics */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-800">Procesamiento Completado</h3>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{result.stats.totalProducts}</div>
              <div className="text-sm text-gray-600">Productos procesados</div>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Tag className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{result.stats.categories.length}</div>
              <div className="text-sm text-gray-600">Categorías encontradas</div>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{result.stats.successfullyParsed}</div>
              <div className="text-sm text-gray-600">Exitosos</div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Categorías detectadas:</h4>
            <div className="flex flex-wrap gap-2">
              {result.stats.categories.map((category, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Errors */}
      {result.errors.length > 0 && (
        <div className="bg-white border border-yellow-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-4 border-b border-yellow-200">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <h3 className="text-lg font-semibold text-gray-800">Advertencias</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {result.errors.map((error, index) => (
                <div key={index} className="text-sm text-yellow-700 bg-yellow-50 rounded p-2">
                  {error}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sample Products Preview */}
      {result.products.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Vista Previa de Productos</h3>
            <p className="text-sm text-gray-600 mt-1">
              Mostrando los primeros 5 productos procesados
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Marca
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Volumen
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {result.products.slice(0, 5).map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                        {product.categoria}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.marca}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {product.producto}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.volumen}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      {product.precio}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {result.products.length > 5 && (
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-center">
              <span className="text-sm text-gray-500">
                y {result.products.length - 5} productos más...
              </span>
            </div>
          )}
        </div>
      )}

      {/* Download Button */}
      {result.products.length > 0 && (
        <div className="text-center">
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Download className="w-5 h-5 mr-3" />
            Descargar Excel
          </button>
        </div>
      )}
    </div>
  );
}