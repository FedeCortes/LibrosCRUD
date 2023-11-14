const fs = require("fs");
const yargs = require('yargs');
const { v4: uuidv4 } = require('uuid'); 
const {createOne, find, get, findByIdAndDelete, findByIdAndUpdate} = require('./Services/libroServices');
const validacionMiddleware = require('./middlewares/validacionMiddleware');

//COMANDOS
//1- create
yargs
  .command('createOne', 'Crea un libro. Parametros: (--author / --title / --description)', (yargs) => {
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

    try {

      validacionMiddleware.esAlfabeticoConEspacios(argv.author)
      
      validacionMiddleware.esAlfanumerico(argv.title)
      
      validacionMiddleware.esMenorA(argv.description, 150)
      validacionMiddleware.esMenorA(argv.author, 50)
      validacionMiddleware.esMenorA(argv.title, 50)
  
   
      const libro = createOne({
        author: argv.author,
        title: argv.title,
        description: argv.description
      })
      console.log("Libro creado exitosamente: ",libro)
    } catch (error) {
      console.error("Ocurrio un error al crear el libro " + error.message ? error.message : error);
    }
    
  })


//2- Find
  .command('find', 'Muestra todos los libros. Se puede filtrar por (--author, --title)', (yargs) => {
    yargs
    .option('author', {
      alias: 'author',
      describe: 'author del libro',
      demandOption: false,
    })
    .option('title', {
      alias: 'titulo',
      describe: 'titulo del libro',
      demandOption: false,
    })
    .option('description', {
      alias: 'description',
      describe: 'descripcion del libro',
      demandOption: false,
    })
  }, (argv) => {

 
    const respuesta = find(argv.author, argv.title);
    console.log(respuesta)
  
 
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
    get(argv.id)

    }
  )
//4- update
  .command('findByIdAndUpdate', 'Actualizar un libro. Parametros: (--id / --nuevoAuthor / --nuevoTitulo / --nuevaDescription)', (yargs) => {
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

    try{
      validacionMiddleware.esAlfabeticoConEspacios(argv.nuevoAuthor)
      
      validacionMiddleware.esAlfanumerico(argv.nuevoTitulo)
      
      validacionMiddleware.esMenorA(argv.nuevaDescription, 150)
      validacionMiddleware.esMenorA(argv.nuevoAuthor, 50)
      validacionMiddleware.esMenorA(argv.nuevoTitulo, 50)

    const libro = findByIdAndUpdate(argv.id, argv.nuevoAuthor, argv.nuevoTitulo, argv.nuevaDescription)
    console.log("Libro actualizado correctamente" ,libro)
  } catch (error) {
    console.error("Ocurrio un error al crear el libro " + error.message ? error.message : error);
  }
  })
//5- delete
  .command('findByIdAndDelete', 'Borrar un libro. Parametros: (--id)', (yargs) => {
    yargs
      .option('id', {
        alias: 'id',
        describe: 'ID del libro a eliminar',
        demandOption: true,
      });
  }, (argv) => {
   
    findByIdAndDelete(argv.id)

  })
  .help() 
  .argv; 


  //Funciones de validacion:
/*
// Función para verificar si una cadena es alfanumerica con espacios  
  function esAlfanumerico(cadena) {
    return /^[a-zA-Z0-9\s]+$/.test(cadena);
}

// Función para verificar si una cadena es alfabética con espacios
function esAlfabeticoConEspacios(cadena) {
    return /^[a-zA-Z\s]+$/.test(cadena);
}
*/
