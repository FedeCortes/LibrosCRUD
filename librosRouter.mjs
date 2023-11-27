import express from 'express';
import {
  createOne,
  booksFetch,
  get,
  findByIdAndDelete,
  findByIdAndUpdate,
} from './Services/libroServices.mjs';
import validationMiddleware from './middlewares/validacionMiddleware.mjs';
import cors from 'cors';

const router = express.Router();
router.use(cors());

// Ruta: Obtener todos los libros
router.get('/', async (req, res) => {
  try {
    const books = await booksFetch();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los libros' });
  }
});

// Ruta: Obtener un libro por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await get(id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Libro no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el libro' });
  }
});

// Ruta: Crear un nuevo libro
router.post('/', async (req, res) => {
  const book = req.body;

  // Aplicar validaciones
  try {
    validationMiddleware.isAlphabeticWithSpaces(book.author);
    validationMiddleware.isValidLength(book.author, 50);
    validationMiddleware.isAlphanumeric(book.title);
    validationMiddleware.isValidLength(book.title, 50);

    if (book.description) {
      validationMiddleware.isValidLength(book.description, 150);
    }

    if (book.rating) {
      validationMiddleware.isValidRating(book.rating);
    }

    if (book.numPages) {
      validationMiddleware.isPositiveInteger(book.numPages);
      validationMiddleware.isLessThan(book.numPages, 5000);
    }

    if (book.year) {
      validationMiddleware.isValidYear(book.year);
    }

    if (book.format) {
      validationMiddleware.isValidFormat(book.format);
    }

    if (book.genre) {
      validationMiddleware.isAlphabeticWithSpaces(book.genre);
      validationMiddleware.isValidLength(book.genre, 50);
    }

    // Si todas las validaciones pasan, crear el libro
    const newBook = await createOne(book);
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
});

// Ruta: Actualizar un libro por ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const book = req.body;

  // Aplicar validaciones
  try {
    validationMiddleware.isAlphanumeric(id);
    validationMiddleware.isAlphabeticWithSpaces(book.author);
    validationMiddleware.isValidLength(book.author, 50);
    validationMiddleware.isAlphanumeric(book.title);
    validationMiddleware.isValidLength(book.title, 50);

    if (book.description) {
      validationMiddleware.isValidLength(book.description, 150);
    }

    if (book.rating) {
      validationMiddleware.isValidRating(book.rating);
    }

    if (book.numPages) {
      validationMiddleware.isPositiveInteger(book.numPages);
      validationMiddleware.isLessThan(book.numPages, 5000);
    }

    if (book.year) {
      validationMiddleware.isValidYear(book.year);
    }

    if (book.format) {
      validationMiddleware.isValidFormat(book.format);
    }

    if (book.genre) {
      validationMiddleware.isAlphabeticWithSpaces(book.genre);
      validationMiddleware.isValidLength(book.genre, 50);
    }

    // Si todas las validaciones pasan, actualizar el libro
    const newBook = await findByIdAndUpdate(id, book.author, book.title, book.description, book.year, book.genre, book.rating, book.numPages, book.format);
    if (newBook) {
      res.json(newBook);
    } else {
      res.status(404).json({ error: 'Libro no encontrado' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
});

// Ruta: Eliminar un libro por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await findByIdAndDelete(id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Libro no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
});

export default router;