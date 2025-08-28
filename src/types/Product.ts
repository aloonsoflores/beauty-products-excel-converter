export interface Product {
  categoria: string;
  marca: string;
  producto: string;
  caracteristicas: string;
  volumen: string;
  precio: string;
  raw?: string;
}

export interface ParseResult {
  products: Product[];
  errors: string[];
  stats: {
    totalProducts: number;
    categories: string[];
    successfullyParsed: number;
  };
}