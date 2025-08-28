# 🧴 Beauty Products to Excel Converter

Este proyecto permite convertir listados de productos de belleza de un archivo `.txt` a un archivo **Excel** organizado y limpio.  
Está construido con **Vite + React** para ofrecer una experiencia rápida y moderna.

## 🚀 Instalación y uso

1. Clona este repositorio:

  git clone https://github.com/aloonsoflores/beauty-products-excel-converter.git
  cd beauty-products-excel-converter

2. Instala las dependencias:

  npm install

3. Inicia el servidor de desarrollo:

  npm run dev

4. Abre la app en tu navegador en http://localhost:5173.

📂 Flujo de trabajo

  1. Sube tu archivo .txt con la lista de productos.
  2. La app limpiará el texto, unificará los productos en una sola línea y los procesará.
  3. Podrás exportar el resultado a Excel (.xlsx).

⚠️ Nota importante: Limpieza del archivo .txt

  Antes de subir tu archivo .txt, asegúrate de limpiar los saltos de línea incorrectos.
  De lo contrario, los productos pueden quedar partidos en varias líneas.

✅ Solución rápida en un editor de texto (Notepad++ o VSCode)

  1. Abre el archivo en Notepad++ o VSCode.
  2. Activa el modo de expresiones regulares en buscar/reemplazar.
  3. Busca este patrón regex:

    \n(?!-)

  👉 Esto significa: encuentra los saltos de línea que no van seguidos de un guion - (o sea, los que están “a mitad” de un producto).

  4. Reemplázalo con un espacio " ".
  5. Haz clic en Reemplazar todo.

  Con esto, cada producto quedará en una sola línea, listo para convertir a Excel.

📜 Licencia

  Este proyecto está bajo la licencia MIT.
  ¡Siéntete libre de usarlo, modificarlo y mejorarlo!