import { Product, ParseResult } from '../types/Product';

export function parseProductsText(text: string): ParseResult {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  const products: Product[] = [];
  const errors: string[] = [];
  const categories = new Set<string>();
  
  let currentCategory = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this is a category line (ends with : and doesn't start with -)
    if (line.endsWith(':') && !line.startsWith('-')) {
      currentCategory = line.replace(':', '').trim();
      categories.add(currentCategory);
      continue;
    }
    
    // Skip empty lines or non-product lines
    if (!line.startsWith('-')) {
      continue;
    }
    
    try {
      const product = parseProductLine(line, currentCategory);
      if (product) {
        products.push(product);
      }
    } catch (error) {
      errors.push(`Error parsing line ${i + 1}: ${line} - ${error}`);
    }
  }
  
  return {
    products,
    errors,
    stats: {
      totalProducts: products.length,
      categories: Array.from(categories),
      successfullyParsed: products.length
    }
  };
}

function parseProductLine(line: string, category: string): Product | null {
  // Remove the leading dash and trim
  let productLine = line.replace(/^-\s*/, '').trim();
  
  // Extract price (ends with €)
  const priceMatch = productLine.match(/(\d+(?:[.,]\d+)?)€\s*$/);
  let precio = '';
  if (priceMatch) {
    // Parse the original price and add 10€ markup
    const originalPrice = parseFloat(priceMatch[1].replace(',', '.'));
    const newPrice = originalPrice + 10;
    precio = newPrice.toFixed(2).replace('.00', '') + '€';
    productLine = productLine.replace(/=?\s*\d+(?:[.,]\d+)?€\s*$/, '').trim();
  }
  
  // Remove trailing = if present
  productLine = productLine.replace(/=\s*$/, '').trim();
  
  // Extract volume (in parentheses, typically ends with ml)
  let volumen = '';
  const volumeMatch = productLine.match(/\(([^)]*(?:ml|ML|g|G))\)/);
  if (volumeMatch) {
    volumen = volumeMatch[1];
    productLine = productLine.replace(/\([^)]*(?:ml|ML|g|G)\)/, '').trim();
  }
  
  // Extract characteristics (remaining parentheses content)
  let caracteristicas = '';
  const charMatches = productLine.match(/\([^)]+\)/g);
  if (charMatches) {
    caracteristicas = charMatches.map(match => match.replace(/[()]/g, '')).join(', ');
    productLine = productLine.replace(/\([^)]+\)/g, '').trim();
  }
  
  // What's left should be Marca + Producto
  const parts = productLine.split(' ');
  if (parts.length < 2) {
    return null;
  }
  
  // Find the first word that indicates the start of product name
  // This includes words that are uppercase but may contain hyphens, accents, or numbers
  let brandEndIndex = -1;
  for (let i = 0; i < parts.length; i++) {
    const word = parts[i];
    // Check if word indicates start of product name:
    // - Has at least 2 characters
    // - Is primarily uppercase (allowing hyphens, accents, numbers)
    // - Contains at least one uppercase letter
    if (word.length >= 2 && 
        word === word.toUpperCase() && 
        /[A-ZÁÉÍÓÚÑÜ]/.test(word) &&
        /^[A-ZÁÉÍÓÚÑÜ0-9\-]+$/.test(word)) {
      brandEndIndex = i;
      break;
    }
  }
  
  let marca = '';
  let producto = '';
  
  if (brandEndIndex > 0) {
    // Brand is everything before the first uppercase word
    marca = parts.slice(0, brandEndIndex).join(' ');
    // Product is everything from the first uppercase word onwards
    producto = parts.slice(brandEndIndex).join(' ');
  } else {
    // Fallback: if no uppercase word found, use original logic
    marca = parts[0];
    producto = parts.slice(1).join(' ');
  }
  
  return {
    categoria: category,
    marca,
    producto,
    caracteristicas,
    volumen,
    precio,
    raw: line
  };
}