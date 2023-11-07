const fs = require('fs');

// Función para cargar los libros desde el archivo JSON al inicio de la aplicación
function cargarLibros() {
  try {
    const librosJSON = fs.readFileSync("libros.json", "utf-8");
    return JSON.parse(librosJSON);
  } catch (error) {
    return [];
  }
}

// Función para guardar la lista de libros en el archivo JSON
function guardarLibros(libros) {
  fs.writeFileSync("libros.json", JSON.stringify(libros, null, 2), "utf-8");
}

module.exports = {
  cargarLibros,
  guardarLibros,
};