

// Función para verificar si una cadena es alfanumerica con espacios  
function esAlfanumerico(cadena) {
    const validacion = /^[a-zA-Z0-9\s]+$/.test(cadena)
    if(!validacion) throw new Error("La cadena no es alfanumerica")
}

// Función para verificar si una cadena es alfabética con espacios
function esAlfabeticoConEspacios(cadena) {
    const validacion = /^[a-zA-Z\s]+$/.test(cadena)
    if(!validacion) throw new Error("La cadena no es alfabetica")
}

function esMenorA(cadena, length){
    const validacion = (cadena.length < length)
    if(!validacion) throw new Error("La cadena es mas larga que "+ length +" caracteres")
}

module.exports = {
    esAlfanumerico,
    esAlfabeticoConEspacios,
    esMenorA
  };