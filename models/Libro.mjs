import mongoose from 'mongoose'
const libroSchema = new mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  year: Number,
  genre: String,
  rating: Number,
  numPages: Number,
  format: String,
});

const Libro = mongoose.model('Libro', libroSchema);

export default Libro;

