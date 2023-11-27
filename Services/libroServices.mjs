import Libro from '../models/Libro.mjs'

export async function createOne({author, title, description, year, genre, rating, numPages, format}) {
  return await Libro.create({
    author,
    title,
    description,
    year,
    genre,
    rating,
    numPages,
    format,
  });
}

export async function booksFetch(author, title) {
  if(author && title){
    return await Libro.find({author,title})
  }
  return await Libro.find();
}

export async function get(id) {
  return await Libro.findById(id);
}

export async function findByIdAndDelete(id) {
  return await Libro.findByIdAndDelete(id);
}

export async function findByIdAndUpdate(id, author, title, description, year, genre, rating, numPages, format) {
  return await Libro.findByIdAndUpdate(id, {
    author,
    title,
    description,
    year,
    genre,
    rating,
    numPages,
    format,
  });
}
