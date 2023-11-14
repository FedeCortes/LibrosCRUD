const fs = require("fs")
const { v4: uuidv4 } = require('uuid')


const Libro = {
   
  createOne({author, title, description}) {
    const libros = JSON.parse(fs.readFileSync("libros.json"))

    const libro = {
      id: uuidv4(),
      author, title, description
    }

    libros.push(libro)
    fs.writeFileSync("libros.json", JSON.stringify(libros))
    return libro
  },

  findByIdAndUpdate(id, {author,title,description}){
    const libros = JSON.parse(fs.readFileSync("libros.json"))

    // Encuentra el índice del libro con el ID proporcionado
    const index = libros.findIndex((libro) => libro.id === id)
    if(index == -1) throw new Error("No encontrado")
  
   
      // Actualiza los campos especificados del libro
      if (author) libros[index].author = author
      if (title) libros[index].title = title
      if (description) libros[index].description = description
      const libroEncontrado = libros[index]
      fs.writeFileSync("libros.json", JSON.stringify(libros))
 
      return libroEncontrado

    
  }, 

  findByIdAndDelete(id){
    const libros = JSON.parse(fs.readFileSync("libros.json"))


      // Encuentra el índice del libro con el ID proporcionado
      const index = libros.findIndex((libro) => libro.id === id);

      if (index !== -1) {
        // El libro fue encontrado, lo mostramos antes de eliminarlo
        console.log("El libro buscado es:");
        console.log(libros[index]);
    
        // Elimina el libro del array usando el índice
        libros.splice(index, 1);

        fs.writeFileSync("libros.json", JSON.stringify(libros, null, 2));
    
        console.log("El libro ha sido eliminado.");
      } else {
        console.log("No se encontró ningún libro con el ID proporcionado.");
      }
  },

  findById(id){
    const libros = JSON.parse(fs.readFileSync("libros.json"))
    const libroEncontrado = libros.find((libro) => libro.id === id)
    if (libroEncontrado) {
      console.log("El libro buscado es:")
      console.log(libroEncontrado)
    } else {
      console.log("No se encontró ningún libro con el ID proporcionado.")
  }
  },

  find(query) {
  
      const libros = JSON.parse(fs.readFileSync("libros.json"));
  
    if (!query) {
      return libros

    } else {
      const filtrados = libros.filter((libro) => {
        // Verifica si el autor y el título coinciden con la consulta, si se proporcionan
        const authorCoincide = !query.author || libro.author === query.author;
        const tituloCoincide = !query.title || libro.title === query.title;
  
        return authorCoincide && tituloCoincide;
      });
      
      return filtrados
    }
  }
}

module.exports = Libro;