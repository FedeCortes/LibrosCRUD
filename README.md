*Sistema de Gestión de Libros*

Este proyecto es un sistema de gestión de libros desarrollado en NodeJS que utiliza MongoDB como base de datos, un servidor Express.js y una interfaz de línea de comandos basada en Inquirer para la interacción. El sistema permite realizar diversas operaciones en los libros, como crear, actualizar, borrar y obtener.
Contenido

    Características
    Instalación
    Uso
    Documentación de la API
    

Características

    Crear, actualizar, borrar y obtener libros.
    Integración con MongoDB para el almacenamiento de datos.
    Servidor Express.js para exponer puntos finales de la API.
    Interfaz de línea de comandos mediante Inquirer para la interacción del usuario.


Instalación 


    git clone https://github.com/tu-nombre-de-usuario/sistema-gestion-libros.git

    cd sistema-gestion-libros

    npm install

Configurar las variables de entorno:

    Crea un archivo .env en el directorio raíz y agrega lo siguiente:

    PORT=5000
    MONGO_DB="mongodb://127.0.0.1:7303"


Uso

Sigue estos pasos para interactuar con el sistema de gestión de libros:

Inicia el servidor (si aún no está en ejecución):

       node cli.mjs
   
        Interactúa con el sistema a través de la interfaz de línea de comandos.
    

Documentación de la API
Endpoint: 

Obtener todos los libros

    Ruta: /api/libros
    Método: GET
    Descripción: Obtener todos los libros almacenados en la base de datos.
    Respuesta Exitosa: Código 200 - OK
    Respuesta Errónea: Código 500 - Error al obtener los libros

Endpoint: Obtener un libro por ID

    Ruta: /api/libros/:id
    Método: GET
    Descripción: Obtener un libro específico por su ID.
    Parámetros de Ruta: id - ID del libro
    Respuesta Exitosa: Código 200 - OK
    Respuesta Errónea: Código 404 - Libro no encontrado, Código 500 - Error al obtener el libro

Endpoint: Crear un nuevo libro

    Ruta: /api/libros
    Método: POST
    Descripción: Crear un nuevo libro con la información proporcionada en el cuerpo de la solicitud.
    Datos del Cuerpo: Detalles del libro (author, title, description, year, genre, rating, numPages, format)
    Respuesta Exitosa: Código 201 - Libro creado exitosamente
    Respuesta Errónea: Código 400 - Error de validación, Código 500 - Error al crear el libro

Endpoint: Actualizar un libro por ID

    Ruta: /api/libros/:id
    Método: PUT
    Descripción: Actualizar un libro existente por su ID con la información proporcionada en el cuerpo de la solicitud.
    Parámetros de Ruta: id - ID del libro a actualizar
    Datos del Cuerpo: Detalles del libro (author, title, description, year, genre, rating, numPages, format)
    Respuesta Exitosa: Código 200 - Libro actualizado exitosamente
    Respuesta Errónea: Código 400 - Error de validación, Código 404 - Libro no encontrado, Código 500 - Error al actualizar el libro

Endpoint: Eliminar un libro por ID

    Ruta: /api/libros/:id
    Método: DELETE
    Descripción: Eliminar un libro por su ID.
    Parámetros de Ruta: id - ID del libro a eliminar
    Respuesta Exitosa: Código 200 - Libro eliminado exitosamente
    Respuesta Errónea: Código 404 - Libro no encontrado, Código 500 - Error al eliminar el libro
