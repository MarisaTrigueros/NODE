// Importa el módulo 'fs' (File System) de Node.js
const fs = require('fs');

// Define el contenido que quieres escribir en el archivo
const content = '¡Hola, mundo! ¿Esto funciona?';

// Usa fs.writeFile() para escribir el archivo
fs.writeFile('output.txt', content, 'utf8', (err) => {
  if (err) {
    // Si ocurre un error, lo muestra en la consola
    console.error('Writing file error:', err);
  } else {
    // Si el archivo se escribe con éxito, muestra un mensaje
    console.log('File succesfully');
  }
});
