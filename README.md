# ProyectoLibros
Crud de libros con NodeJS
Este repositorio contiene un proyecto de CRUD (Crear, Leer, Actualizar, Borrar) de libros desarrollado en Node.js. El proyecto permite la gestión de una lista de libros almacenados en un archivo JSON, con comandos específicos para interactuar con ellos.
Características Destacadas:

    Crear Libros: Agrega nuevos libros especificando el autor, el título y una descripción. Se aplican validaciones para garantizar la calidad de los datos ingresados.

    Listar Libros: Muestra la lista completa de libros disponibles.

    Obtener Libro por ID: Busca un libro en particular según su identificador único.

    Actualizar Libro: Modifica los detalles de un libro existente, incluyendo el autor, el título y la descripción. Se aplican validaciones para mantener la integridad de los datos.

    Borrar Libro: Elimina un libro de la lista según su ID.

Cómo Utilizar:

    Clona este repositorio en tu entorno local.

    Ejecuta npm install para instalar las dependencias necesarias.

    Utiliza los siguientes comandos de línea de comandos para interactuar con la aplicación:

        Crear un Libro: node index.js create --author [Autor] --title [Título] --description [Descripción]
            Crea un nuevo libro especificando el autor, el título y una descripción. Se aplican validaciones para garantizar la calidad de los datos ingresados.

        Listar Todos los Libros: node index.js fetch
            Muestra la lista completa de libros disponibles.

        Obtener un Libro por ID: node index.js get --id [ID]
            Busca un libro en particular según su identificador único.

        Actualizar un Libro: node index.js update --id [ID] --nuevoAuthor [Nuevo Autor] --nuevoTitulo [Nuevo Título] --nuevaDescription [Nueva Descripción]
            Modifica los detalles de un libro existente, incluyendo el autor, el título y la descripción. Se aplican validaciones para mantener la integridad de los datos.

        Borrar un Libro: node index.js delete --id [ID]
            Elimina un libro de la lista según su ID.

Estructura del Proyecto:

    index.js: El archivo principal que contiene la lógica para gestionar los comandos de línea de comandos.

    Services/libroServices.js: Contiene funciones para cargar y guardar libros en un archivo JSON.

    Models/Libro.js: Define el modelo de libro utilizado en la aplicación.

    libros.json: El archivo JSON que almacena la lista de libros.

    Funciones de Validación: Se incluyen funciones que verifican la integridad de los datos ingresados, como autor, título y descripción.
