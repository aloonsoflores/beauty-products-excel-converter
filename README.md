# 🧴 Beauty Products to Excel Converter
Una aplicación web moderna que convierte listados de productos de belleza desde archivos de texto plano (.txt) a archivos Excel (.xlsx) organizados y listos para usar. Construida con Vite + React para ofrecer una experiencia rápida y fácil de usar.

![React](https://img.shields.io/badge/React-18.x-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-4.x-purple?logo=vite)
![License-MIT](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Características
  - 📤 Carga fácil: Arrastra y suelta o selecciona tus archivos .txt
  - 🧹 Limpieza automática: Corrige saltos de línea incorrectos en los productos
  - 📊 Exportación a Excel: Genera archivos .xlsx perfectamente organizados
  - 🎨 Interfaz moderna: Diseño intuitivo y responsive
  - ⚡ Rendimiento optimizado: Construido con Vite para tiempos de carga ultrarrápidos

## 🚀 Demo
Puedes probar una demo en vivo aquí

## 📦 Instalación
Sigue estos pasos para instalar y ejecutar el proyecto localmente:

1. Clona este repositorio:

  ```bash
  git clone https://github.com/tuusuario/beauty-products-excel-converter.git
  cd beauty-products-excel-converter
  ```

2. Instala las dependencias:

  ```bash
  npm install
  ```

3. Inicia el servidor de desarrollo:

  ```bash
  npm run dev
  ```

4. Abre la aplicación en tu navegador:
  👉 [http://localhost:5173](http://localhost:5173)

## 📖 Cómo usar
**Flujo básico de trabajo**
  1. Prepara tu archivo: Asegúrate de que tu listado de productos tenga el formato correcto
  2. Sube el archivo: Usa el botón de carga o arrastra tu archivo .txt a la zona designada
  3. Revisa los datos: La aplicación mostrará un preview de los productos detectados
  4. Exporta a Excel: Descarga tu archivo Excel perfectamente organizado

**⚠️ Formato del archivo de entrada**
Para mejores resultados, tu archivo .txt debe seguir este formato:

  ```text
  - Nombre del producto (Detalles)(Tipo)(Más detalles)(Tamaño)= Precio
  - Otro producto (Detalles)(Tipo)(Más detalles)(Tamaño)= Precio
  ```

Ejemplo:

  ```text
  - Clarins EXTRA FIRMING JOUR (COLLAGENO)(DÍA)(TODO TIPO PIEL)(50ml)= 40€
  - La Roche Posay EFFACLAR (PIEL GRASA)(SÉRUM)(ANTIMARCAS)(30ml)= 32€
  ```

**🔧 Corrección de saltos de línea incorrectos**
Algunos listados pueden traer saltos de línea que parten un producto en varias líneas. Para corregirlos:

  1. Abre el archivo en un editor de texto (Notepad++, VSCode, Sublime Text)
  2. Activa el modo de expresiones regulares en buscar/reemplazar
  3. Busca este patrón regex: \n(?!-)
    - Esto encuentra saltos de línea que NO van seguidos de un guion
  4. Reemplázalo con un espacio en blanco
  5. Haz clic en "Reemplazar todo"

**Ejemplo de corrección:**
**❌ Texto original con saltos incorrectos:**

  ```text
  - Clarins EXTRA FIRMING JOUR (COLLAGENO)(DÍA)(TODO
  TIPO PIEL)(50ml)= 40€
  ```

**✅ Texto corregido:**

  ```text
  - Clarins EXTRA FIRMING JOUR (COLLAGENO)(DÍA)(TODO TIPO PIEL)(50ml)= 40€
  ```

**📜 Licencia**
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

**👥 Autores**
  - [Alonso Flores](https://github.com/aloonsoflores/)

⭐ ¡Si este proyecto te fue útil, por favor déjale una estrella en GitHub!
