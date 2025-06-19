#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { exec } = require('child_process');
const execAsync = promisify(exec);
const sharp = require('sharp');
const fsPromises = require('fs').promises;

// Directorios a revisar
const directories = ['public', 'app'];
// Extensiones de imagen a optimizar
const extensions = ['.jpg', '.jpeg', '.png'];
// Directorio base del proyecto
const basePath = path.resolve(__dirname, '..');

/**
 * Convierte una imagen a formato WebP
 * @param {string} filePath - Ruta del archivo a convertir
 */
async function convertToWebP(filePath) {
  try {
    const outputPath = `${filePath}.webp`;
    
    // Verificar si ya existe la versión WebP
    if (fs.existsSync(outputPath)) {
      console.log(`Ya existe: ${outputPath}`);
      return;
    }
    
    console.log(`Convirtiendo a WebP: ${filePath}`);
    await execAsync(`npx imagemin ${filePath} --plugin=webp -o ${path.dirname(filePath)}`);
    console.log(`Convertido: ${outputPath}`);
  } catch (error) {
    console.error(`Error al convertir ${filePath}:`, error.message);
  }
}

/**
 * Optimiza una imagen usando sharp
 * @param {string} filePath - Ruta del archivo a optimizar
 */
async function optimizeImage(filePath) {
  try {
    // Si es SVG, no se procesa
    if (filePath.endsWith('.svg')) {
      return;
    }
    
    console.log(`Optimizando: ${filePath}`);
    
    // Crear copia de seguridad
    const backupPath = `${filePath}.backup`;
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(filePath, backupPath);
    }
    
    // Optimizar usando sharp
    await sharp(filePath)
      .resize({ 
        width: 1920, 
        height: 1080, 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .jpeg({ quality: 80, progressive: true })
      .png({ quality: 80, progressive: true })
      .toFile(`${filePath}.tmp`);
    
    // Reemplazar el archivo original con el optimizado
    fs.unlinkSync(filePath);
    fs.renameSync(`${filePath}.tmp`, filePath);
    
    console.log(`Optimizado: ${filePath}`);
    
    // Convertir a WebP también
    await convertToWebP(filePath);
  } catch (error) {
    console.error(`Error al optimizar ${filePath}:`, error.message);
  }
}

/**
 * Recorre recursivamente un directorio buscando imágenes para optimizar
 * @param {string} directory - Directorio a recorrer
 */
async function processDirectory(directory) {
  try {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      
      if (entry.isDirectory()) {
        // Ignorar node_modules y .next
        if (entry.name !== 'node_modules' && entry.name !== '.next') {
          await processDirectory(fullPath);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (extensions.includes(ext)) {
          await optimizeImage(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`Error al procesar el directorio ${directory}:`, error.message);
  }
}

async function generateFavicons() {
  const sourceIcon = path.join(__dirname, '../public/logo_original.png');
  const outputDir = path.join(__dirname, '../public');

  // Crear los diferentes tamaños de favicon
  const sizes = {
    'favicon-16x16.png': 16,
    'favicon-32x32.png': 32,
    'favicon-192x192.png': 192,
    'favicon-512x512.png': 512,
    'apple-touch-icon.png': 180,
  };

  for (const [filename, size] of Object.entries(sizes)) {
    await sharp(sourceIcon)
      .resize(size, size)
      .toFile(path.join(outputDir, filename));
  }

  // Generar el favicon.ico (múltiples tamaños)
  await sharp(sourceIcon)
    .resize(32, 32)
    .toFile(path.join(outputDir, 'favicon.ico'));

  // Generar SVG para Safari pinned tab
  await sharp(sourceIcon)
    .resize(512, 512)
    .toFile(path.join(outputDir, 'safari-pinned-tab.svg'));

  console.log('✅ Favicons generados correctamente');
}

async function optimizeImages() {
  const publicDir = path.join(__dirname, '../public');
  const files = await fsPromises.readdir(publicDir);

  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const filePath = path.join(publicDir, file);
      const stats = await fsPromises.stat(filePath);
      
      // Solo optimizar si el archivo es mayor a 100KB
      if (stats.size > 100 * 1024) {
        await sharp(filePath)
          .resize(1920, null, { withoutEnlargement: true })
          .jpeg({ quality: 80, progressive: true })
          .toBuffer()
          .then(data => fsPromises.writeFile(filePath, data));
        
        console.log(`✅ Imagen optimizada: ${file}`);
      }
    }
  }
}

/**
 * Función principal que inicia el proceso
 */
async function main() {
  console.log('Iniciando optimización de imágenes...');
  
  for (const dir of directories) {
    const dirPath = path.join(basePath, dir);
    if (fs.existsSync(dirPath)) {
      await processDirectory(dirPath);
    }
  }
  
  await generateFavicons();
  await optimizeImages();
  
  console.log('¡Optimización de imágenes completada!');
}

// Ejecutar la función principal
main().catch(error => {
  console.error('Error en el proceso principal:', error);
  process.exit(1);
}); 