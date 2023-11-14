const Libro = require("../models/Libro");


function createOne({author,title,description}) {
  return Libro.createOne({author,title,description})
}

function find(author,title){

  return Libro.find({author,title})
}

function get(id){
  Libro.findById(id)
}

function findByIdAndDelete(id){
  Libro.findByIdAndDelete(id)
}

function findByIdAndUpdate(id, author, title, description){
  
  return Libro.findByIdAndUpdate(id, {author,title,description})
}

module.exports = {
  createOne,
  find,
  get,
  findByIdAndDelete,
  findByIdAndUpdate
};