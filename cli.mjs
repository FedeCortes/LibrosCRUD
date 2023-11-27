import mongoose from 'mongoose';
import inquirer from 'inquirer';
import fs from 'fs';
import express from 'express';
import {
  createOne,
  booksFetch,
  get,
  findByIdAndDelete,
  findByIdAndUpdate,
} from './Services/libroServices.mjs';
import validacionMiddleware from './middlewares/validacionMiddleware.mjs';
import librosRouter from './librosRouter.mjs'; 
import dotenv from 'dotenv'; 

dotenv.config();

const PORT = process.env.PORT || 5000
const MONGO_DB = process.env.MONGO_DB

connectToServer()
  .then(() => connectToMongoDB())
  .then(() => migration())
  .then(() => showMainMenu())

  async function connectToServer(){

    try{
    const app = express();
  
    // Configurar Express para usar JSON y URL-encoded
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  
    // Usar el enrutador de libros
    app.use('/api/libros', librosRouter);
   
  
    // Iniciar el servidor Express
    app.listen(PORT, () => {
      console.log(`Servidor Express iniciado en el puerto ${PORT}`);
    });
  }catch(error){
    console.error("Error al conectarse al servidor "+error)
  }
  
  }
// Conexión a MongoDB
async function connectToMongoDB() {
  console.clear();
  try {
  
    await mongoose.connect(MONGO_DB,{
      useNewUrlParser: true,
      useUnifiedTopology: true, 
    });
    console.log('Conexión a MongoDB establecida con éxito!');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
  }
}

async function migration() {
  const archiveRoute = 'libros.json';

  if (fs.existsSync(archiveRoute)) {
    // Leer el archivo JSON
    const jsonData = fs.readFileSync(archiveRoute, 'utf8');
    const jsonBooks = JSON.parse(jsonData);

    try {
      // Obtener todos los libros existentes en MongoDB
      const booksInBD = await booksFetch();

      // Determinar libros que no existen en la base de datos
      const newBooks = jsonBooks.filter(
        (bookJSON) =>
          !booksInBD.some((bookBD) => bookBD.id === bookJSON.id)
      );

      // Insertar libros nuevos en la base de datos
      if (newBooks.length > 0) {
        for (const newBook of newBooks) {
          await createOne(newBook);
        }
        console.log('Datos migrados exitosamente.');

        // Borrar el archivo JSON después de la migración
        fs.unlinkSync(archiveRoute);
        console.log('Archivo JSON borrado.');
      } else {
        // Si el archivo JSON está vacío, también puedes borrarlo
        if (jsonBooks.length === 0) {
          fs.unlinkSync(archiveRoute);
          console.log('Archivo JSON vacío borrado.');
        } else {
          console.log('No hay nuevos datos para migrar.');
        }
      }
    } catch (error) {
      console.error('Error al migrar datos:', error.message);
    }
  } else {
    console.log('El archivo JSON no existe.');
  }
}      
    
async function showMainMenu() {
  const mainMenuOptions = ['Gestión de Libros', 'Salir'];
  const mainMenuAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Seleccione una opción:',
      choices: mainMenuOptions,
    },
  ]);

  switch (mainMenuAnswer.option) {
    case 'Gestión de Libros':
      // Lógica para la gestión de libros
      await showMenu();
      break;
    case 'Salir':
      // Lógica para salir
      console.log('Saliendo de la aplicación. ¡Hasta luego!');
      break;
    default:
      console.log('Opción no reconocida.');
      break;
  }
}

async function showMenu(){
inquirer
.prompt([
  {
    type: 'list',
    name: 'opcion',
    message: 'Seleccione una opción:',
    choices: [
      'Crear un libro',
      'Mostrar todos los libros',
      'Obtener un libro por ID',
      'Actualizar un libro',
      'Borrar un libro',
      'Volver al Menú Principal',
    ],
  },
])
.then(async (respuestas) => {
  switch (respuestas.opcion) {
    case 'Crear un libro':
    // Preguntas para crear un libro
    const respuestasCrear = await inquirer.prompt([
      {
        type: 'input',
        name: 'author',
        message: 'Autor del libro:',
        validate: (value) => {
          try {
            validacionMiddleware.isAlphabeticWithSpaces(value);
            validacionMiddleware.isValidLength(value, 50);
            return true;
          } catch (error) {
            return error.message;
          }
        },
      },
      {
        type: 'input',
        name: 'title',
        message: 'Título del libro:',
        validate: (value) => {
          try {
            validacionMiddleware.isAlphanumeric(value);
            validacionMiddleware.isValidLength(value, 50);
            return true;
          } catch (error) {
            return error.message;
          }
        },
      },
      {
        type: 'input',
        name: 'description',
        message: 'Descripción del libro (opcional):',
        validate: (value) => {
          try {
            validacionMiddleware.isValidLength(value, 150);
            return true;
          } catch (error) {
            return error.message;
          }
        },
      },
      {
        type: 'input',
        name: 'year',
        message: 'Año de publicacion (opcional):',
        validate: (value) => {
          if (value.trim() === '') {
            return true; // Año de publicación es opcional, puede estar vacío
          }
          try {
            validacionMiddleware.isValidYear(value);
            return true;
          } catch (error) {
            return error.message;
          }
        },
      },
      {
        type: 'input',
        name: 'genre',
        message: 'Genero (opcional):',
        validate: (value) => {
          try {
            validacionMiddleware.isValidLength(value, 50);
            return true;
          } catch (error) {
            return error.message;
          }
        },
      },
      {
        type: 'input',
        name: 'rating',
        message: 'Valoracion (opcional):',
        validate: (value) => {
          if (value.trim() === '') {
            return true; 
          }
          try {
            validacionMiddleware.isValidRating(parseFloat(value));
            return true;
          } catch (error) {
            return error.message;
          }
        },
      },
      {
        type: 'input',
        name: 'numPages',
        message: 'Numero de paginas (opcional):',
        validate: (value) => {
          if (value.trim() === '') {
            return true; 
          }
          try {
            validacionMiddleware.isLessThan(value, 5000)
            validacionMiddleware.isPositiveInteger(value);
       
            return true;
          } catch (error) {
            return error.message;
          }
        },
      },
      {
        type: 'input',
        name: 'format',
        message: 'Formato (Fisico o digital) (opcional):',
        validate: (value) => {
          if (value.trim() === '') {
            return true; 
          }
          try {
            validacionMiddleware.isValidFormat(value);
            return true;
          } catch (error) {
            return error.message;
          }
        },
      },
    ]);

    try {
      const libro = await createOne({
        author: respuestasCrear.author,
        title: respuestasCrear.title,
        description: respuestasCrear.description,
        year: respuestasCrear.year,
        genre: respuestasCrear.genre,
        rating: respuestasCrear.rating,
        numPages: respuestasCrear.numPages,
        format: respuestasCrear.format,
      })

      console.log('Libro creado exitosamente:', libro);
    } catch (error) {
      console.error(
        'Ocurrió un error al crear el libro ' +
          (error.message ? error.message : error)
      );
    }
    break;

      case 'Mostrar todos los libros':
        const respuestaMostrar = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcion',
                message: '¿Cómo desea ver los libros?',
                choices: ['Mostrar todos los libros', 'Filtrar por autor y título'],
            },
        ]);
    
        if (respuestaMostrar.opcion === 'Mostrar todos los libros') {
            // Lógica para mostrar todos los libros
            try {
              const libros = await booksFetch();
      
              if (libros.length === 0) {
                  console.log('No se encontraron libros.');
              } else {
                  const opcionesLibros = libros.map(libro => {
                      return {
                          name: `Título: ${libro.title} - Autor: ${libro.author}`,
                          value: libro // El valor asociado será el objeto completo del libro
                      };
                  });
      
                  const respuestasSeleccion = await inquirer.prompt([
                      {
                          type: 'list',
                          name: 'libroSeleccionado',
                          message: 'Selecciona un libro para ver más información:',
                          choices: opcionesLibros
                      }
                  ]);
      
                  // El libro seleccionado estará disponible en respuestasSeleccion.libroSeleccionado
                  const libroSeleccionado = respuestasSeleccion.libroSeleccionado;
                  console.log('Información detallada del libro seleccionado:', libroSeleccionado);
              }
      
          } catch (error) {
              console.error("Ocurrió un error: " + error);
          }
        } else {
            // Preguntas adicionales si elige filtrar
            const respuestasFiltrar = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'author',
                    message: 'Ingrese el nombre del autor:',
                },
                {
                    type: 'input',
                    name: 'title',
                    message: 'Ingrese el título del libro:',
                },
            ]);
    
            // Lógica para filtrar por autor y título
            const librosFiltrados = await booksFetch(respuestasFiltrar.author, respuestasFiltrar.title);
            console.log(librosFiltrados);
        }
        break;

        case 'Obtener un libro por ID':
          try {
            const libros = await booksFetch();
        
            if (libros.length === 0) {
              console.log('No se encontraron libros.');
            } else {
              const opcionesLibros = libros.map(libro => {
                return {
                  name: `ID: ${libro.id} - Título: ${libro.title}`,
                  value: libro,
                };
              });
        
              const respuestasBuscarPorId = await inquirer.prompt([
                {
                  type: 'list',
                  name: 'opcion',
                  message: 'Selecciona una opción:',
                  choices: [
                    { name: 'Ingresar una ID directamente', value: 'ingresarId' },
                    { name: 'Recorrer entre IDs de la lista', value: 'recorrerIds' },
                  ],
                },
              ]);
        
              let libroSeleccionado;
              if (respuestasBuscarPorId.opcion === 'ingresarId') {
                // Preguntar por la ID directamente
                const respuestaId = await inquirer.prompt([
                  {
                    type: 'input',
                    name: 'id',
                    message: 'Ingresa la ID del libro que deseas obtener:',
                  },
                ]);
        
                // Buscar el libro por ID
                libroSeleccionado = libros.find(libro => libro.id === respuestaId.id);
              } else {
                // Preguntas para seleccionar de la lista
                const respuestasSeleccion = await inquirer.prompt([
                  {
                    type: 'list',
                    name: 'libroSeleccionado',
                    message: 'Selecciona un libro para ver más información:',
                    choices: opcionesLibros,
                  },
                ])
        
                // El libro seleccionado estará disponible en respuestasSeleccion.libroSeleccionado
                libroSeleccionado = respuestasSeleccion.libroSeleccionado;
              }
        
              console.log('Información detallada del libro seleccionado:', libroSeleccionado);
            }
          } catch (error) {
            console.error("Ocurrió un error: " + error);
          }
          break;
        
      case 'Actualizar un libro':
        const libros = await booksFetch();
        // Preguntas para actualizar un libro
        const opcionesLibros = libros.map(libro => {
          return {
              name: `Título: ${libro.title} - Autor: ${libro.author}`,
              value: libro
          }
        })
        const respuestasActualizar = await inquirer.prompt([
          {
            type: 'list',
            name: 'id',
            message: 'Selecciona un libro para ver más información:',
            choices: opcionesLibros
        },
          {
            type: 'input',
            name: 'author',
            message: 'Autor:',
            validate: (value) => {
              try {
                validacionMiddleware.isAlphabeticWithSpaces(value);
                validacionMiddleware.isValidLength(value, 50);
                return true;
              } catch (error) {
                return error.message;
              }
            },
          },
          {
            type: 'input',
            name: 'title',
            message: 'Título:',
            validate: (value) => {
              try {
                validacionMiddleware.isAlphanumeric(value);
                validacionMiddleware.isValidLength(value, 50);
                return true;
              } catch (error) {
                return error.message;
              }
            },
          },
          {
            type: 'input',
            name: 'description',
            message: 'Descripción:',
            validate: (value) => {
              try {
                validacionMiddleware.isAlphanumeric(value);
                validacionMiddleware.isValidLength(value, 150);
                return true;
              } catch (error) {
                return error.message;
              }
            },
          },
          {
            type: 'input',
            name: 'year',
            message: 'Año de publicación (opcional):',
            validate: (value) => {
              if (value.trim() === '') {
                return true; 
              }
              try {
                validacionMiddleware.isValidYear(value);
                return true;
              } catch (error) {
                return error.message;
              }
            },
          },
          {
            type: 'input',
            name: 'genre',
            message: 'Género (opcional):',
            validate: (value) => {
              try {
                validacionMiddleware.isValidLength(value, 50);
                return true;
              } catch (error) {
                return error.message;
              }
            },
          },
          {
            type: 'input',
            name: 'rating',
            message: 'Valoración (opcional):',
            validate: (value) => {
              if (value.trim() === '') {
                return true; 
              }
              try {
                validacionMiddleware.isValidRating(parseFloat(value));
                return true;
              } catch (error) {
                return error.message;
              }
            },
          },
          {
            type: 'input',
            name: 'numPages',
            message: 'Número de páginas (opcional):',
            validate: (value) => {
              if (value.trim() === '') {
                return true; 
              }
              try {
                validacionMiddleware.isPositiveInteger(value);
                validacionMiddleware.isLessThan(value, 5000)
                return true;
              } catch (error) {
                return error.message;
              }
            },
          },
          {
            type: 'input',
            name: 'format',
            message: 'Formato (Físico o digital) (opcional):',
            validate: (value) => {
              if (value.trim() === '') {
                return true; 
              }
              try {
                validacionMiddleware.isValidFormat(value);
                return true;
              } catch (error) {
                return error.message;
              }
            },
          },
          {
            type: 'input',
            name: 'respuesta',
            message: '¿Estás seguro que quieres actualizar el libro? (s/n):',
            validate: (value) => {
              
              if (value.trim() === '') {
                return true; 
              }
              try {
                validacionMiddleware.isConfirmation(value);
                return true;
              } catch (error) {
                return error.message;
              }
            },
          },
        ]);
      
        if (respuestasActualizar.respuesta.toLowerCase() === 'n') {
          console.log('Cancelaste la operación');
          break;
        } else if (respuestasActualizar.respuesta.toLowerCase() === 's') {
          try {
            // Lógica de actualización
            await findByIdAndUpdate(
              respuestasActualizar.id,
              respuestasActualizar.author,
              respuestasActualizar.title,
              respuestasActualizar.description,
              respuestasActualizar.year,
              respuestasActualizar.genre,
              respuestasActualizar.rating,
              respuestasActualizar.numPages,
              respuestasActualizar.format,
            )
              .then(()=>{
                console.log("Libro actualizado correctamente")
              })
         
              
            
          } catch (error) {
            console.error(
              'Ocurrió un error al actualizar el libro ' +
                (error.message ? error.message : error)
            );
          }
          break;
        }
      
    case 'Borrar un libro':
      try {
        const libros = await booksFetch();

        if (libros.length === 0) {
            console.log('No se encontraron libros.');
        } else {
            const opcionesLibros = libros.map(libro => {
                return {
                    name: `ID: ${libro.id} - Título ${libro.title}`,
                    value: libro // El valor asociado será el objeto completo del libro
                };
            });

            const respuestasSeleccion = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'libroSeleccionado',
                    message: 'Selecciona un libro para ver más información:',
                    choices: opcionesLibros
                }
            ]);

            // El libro seleccionado estará disponible en respuestasSeleccion.libroSeleccionado
            const confirmacion = await inquirer.prompt([
              {
                type: 'input',
                name: 'respuesta',
                message: 'Estas seguro que queres borrar el libro? s/n:',
                validate: (value) => {
                  validacionMiddleware.isConfirmation(value)
                  return true;
                },
              },
            ]);
      
            if(confirmacion.respuesta =="n"){
              console.log("Cancelaste la operacion")
              break;
            }else if(confirmacion.respuesta=="s"){
              const libroSeleccionado = respuestasSeleccion.libroSeleccionado;
              const libroEliminado = await findByIdAndDelete(libroSeleccionado.id);
            console.log("Libro borrado "+libroEliminado)
              break;
      
            }
      
        }

    } catch (error) {
        console.error("Ocurrió un error: " + error);

      }
      break;
      case 'Volver al Menú Principal':
          await showMainMenu();
          break;

    default:
      console.log('Opción no reconocida.');
      break;
  }
}
)}



  