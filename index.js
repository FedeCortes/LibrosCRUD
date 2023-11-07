const fs = require("fs");
const yargs = require('yargs');
const { v4: uuidv4 } = require('uuid'); 
const libroServices = require('./Services/libroServices');

// Modelo de libro
const Libro = require('./Models/Libro');

let libros = libroServices.cargarLibros(); // Cargar los libros desde el archivo JSON al inicio

//COMANDOS
//1- create
yargs
  .command('create', 'Crea un libro. Parametros: (--author / --title / --description)', (yargs) => {
    yargs
      .option('author', {
        alias: 'a',
        describe: 'Autor del libro',
        demandOption: true,
        type:'string',
      })
      .option('title', {
        alias: 't',
        describe: 'Título del libro',
        demandOption: true,
        type:'string'
      })
      .option('description', {
        alias: 'd',
        describe: 'Descripción del libro',
        type:"string",
      });
  }, (argv) => {

    if (!esAlfabeticoConEspacios(argv.author)) {
      console.log('El autor debe contener solo letras (alfabético).');
      return;
  }
    if (!esAlfanumerico(argv.title)) {
      console.log('El titulo debe contener solo letras, numeros y espacios');
      return;
  }
    if(argv.description.length>150){
      console.log("La descripcion tiene una limitacion de 150 caracteres, introduzca menos caracteres");
      return;
    }



    const nuevoId = uuidv4();
    // Crea una instancia de Libro con lo recibido
    const nuevoLibro = new Libro(nuevoId, argv.author, argv.title, argv.description);

    // Agrega el libro al arreglo existente de libros
    libros.push(nuevoLibro);

    // Guarda la lista de libros en el archivo JSON
    libroServices.guardarLibros(libros);

    console.log('Libro creado:', nuevoLibro);
    console.log('Libros en la lista:', libros);
  })
//2- fetch
  .command('fetch', 'Muestra todos los libros. No recibe parametros.', {}, () => {
    console.log("Los libros son: ");
    libros.forEach((libro) => {
      console.log(libro);
    });
  })
//3- get
  .command('get', 'Obtener un libro por id. Parametros: (--id)', (yargs) => {
    yargs
    .option('id', {
      alias: 'id',
      describe: 'id del libro',
      demandOption: true,
    });
  }, (argv) => {
    const libroEncontrado = libros.find((libro) => libro.id === argv.id);
    if (libroEncontrado) {
      console.log("El libro buscado es:");
      console.log(libroEncontrado);
    } else {
      console.log("No se encontró ningún libro con el ID proporcionado.");
    }
  })
//4- update
  .command('update', 'Actualizar un libro. Parametros: (--id / --nuevoAuthor / --nuevoTitulo / --nuevaDescription)', (yargs) => {
    yargs
    .option('id', {
      alias: 'id',
      describe: 'id del libro',
      demandOption: true,
    })
    .option('nuevoAuthor', {
      alias: 'na',
      describe: 'id del libro',
      demandOption: true,
      type:"string",
    })
    .option('nuevoTitulo', {
      alias: 'nt',
      describe: 'id del libro',
      demandOption: true,
      type:"string",
    })
    .option('nuevaDescription', {
      alias: 'nd',
      describe: 'nueva descripcion',
      demandOption: true,
      type:"string",
    });
  }, (argv) => {
    const libroEncontrado = libros.find((libro) => libro.id === argv.id);
    if (libroEncontrado) {
      if (!esAlfabeticoConEspacios(argv.nuevoAuthor)) {
        console.log('El autor debe contener solo letras (alfabético).');
        return;
    }
    if (!esAlfanumerico(argv.nuevoTitulo)) {
      console.log('El titulo debe contener solo letras, numeros y espacios');
      return;
    }
    if(argv.nuevaDescription.length>150){
      console.log("La descripcion tiene una limitacion de 150 caracteres, introduzca menos caracteres");
      return;
    }
      libroEncontrado.author = argv.nuevoAuthor;
      libroEncontrado.title = argv.nuevoTitulo;
      libroEncontrado.description = argv.nuevaDescription;
      
      libroServices.guardarLibros(libros);
      console.log("Libro modificado correctamente")
    } else {
      console.log("No se encontró ningún libro con el ID proporcionado.");
    }
  })
//5- delete
  .command('delete', 'Borrar un libro. Parametros: (--id)', (yargs) => {
    yargs
      .option('id', {
        alias: 'id',
        describe: 'ID del libro a eliminar',
        demandOption: true,
      });
  }, (argv) => {
    const libroIndex = libros.findIndex((libro) => libro.id === argv.id);
  
    if (libroIndex !== -1) {
      // Elimina el libro del arreglo usando el índice encontrado
      libros.splice(libroIndex, 1);
      
      // Guarda la lista de libros actualizada en el archivo JSON
      libroServices.guardarLibros(libros);
      
      console.log("Libro eliminado correctamente");
    } else {
      console.log("No se encontró ningún libro con el ID proporcionado.");
    }
  })
  .help() 
  .argv; 


  //Funciones de validacion:

// Función para verificar si una cadena es alfanumerica con espacios  
  function esAlfanumerico(cadena) {
    return /^[a-zA-Z0-9\s]+$/.test(cadena);
}

// Función para verificar si una cadena es alfabética con espacios
function esAlfabeticoConEspacios(cadena) {
    return /^[a-zA-Z\s]+$/.test(cadena);
}

