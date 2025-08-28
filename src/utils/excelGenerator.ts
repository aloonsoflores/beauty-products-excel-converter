import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Product } from '../types/Product';

export function generateExcel(products: Product[]): void {
  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  
  // Prepare data for Excel
  const excelData = products.map(product => ({
    'Categoría': product.categoria,
    'Marca': product.marca,
    'Producto': product.producto,
    'Características': product.caracteristicas,
    'Volumen': product.volumen,
    'Precio': product.precio
  }));
  
  // Create worksheet from data
  const ws = XLSX.utils.json_to_sheet(excelData);
  
  // Set column widths
  const colWidths = [
    { wch: 20 }, // Categoría
    { wch: 15 }, // Marca
    { wch: 40 }, // Producto
    { wch: 30 }, // Características
    { wch: 12 }, // Volumen
    { wch: 10 }  // Precio
  ];
  ws['!cols'] = colWidths;
  
  // Style the header row
  const headerStyle = {
    font: { bold: true, color: { rgb: "FFFFFF" } },
    fill: { fgColor: { rgb: "4F46E5" } },
    alignment: { horizontal: "center", vertical: "center" }
  };
  
  // Apply styles to header cells
  ['A1', 'B1', 'C1', 'D1', 'E1', 'F1'].forEach(cellAddress => {
    if (ws[cellAddress]) {
      ws[cellAddress].s = headerStyle;
    }
  });
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Productos de Belleza');
  
  // Generate filename with timestamp
  const now = new Date();
  const timestamp = now.toISOString().slice(0, 10); // YYYY-MM-DD
  const filename = `productos_belleza_${timestamp}.xlsx`;
  
  // Write and download file
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, filename);
}