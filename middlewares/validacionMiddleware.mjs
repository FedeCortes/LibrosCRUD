function isValidLength(string, maxLength) {
    if (string.length > maxLength) {
        throw new Error(`La longitud del campo excede el límite de ${maxLength} caracteres`);
    }
}

// Function to validate the rating as a decimal number between 0 and 5
function isValidRating(rating) {
    if (isNaN(rating) || rating < 0 || rating > 5) {
        throw new Error("La valoración debe ser un número decimal entre 0 y 5");
    }
}

// Function to validate that the number of pages is a positive integer
function isPositiveInteger(number) {
    const validation = /^\d+$/.test(number) && parseInt(number, 10) > 0;
    if (!validation) throw new Error("El número de páginas debe ser un número entero positivo");
}

// Function to validate the book format
function isValidFormat(format) {
    const validFormats = ["fisico", "digital"];
    if (!validFormats.includes(format.toLowerCase())) {
        throw new Error("El formato del libro debe ser 'físico' o 'digital'");
    }
}

// Function to verify if a string is alphanumeric with spaces
function isAlphanumeric(string) {
    const validation = /^[a-zA-Z0-9\s]+$/.test(string)
    if(!validation) throw new Error("La cadena no es alfanumérica")
}

// Function to verify if a string is alphabetic with spaces
function isAlphabeticWithSpaces(string) {
    const validation = /^[a-zA-Z\s]+$/.test(string)
    if(!validation) throw new Error("La cadena no es alfabética")
}

function isLessThan(number, maxNumber) {
    const validation = number < maxNumber
    if(!validation) throw new Error(`${number} es mayor a la cantidad permitida`)
}

function isValidYear(value) {
    const currentYear = new Date().getFullYear();
    const enteredYear = parseInt(value, 10);
  
    if (isNaN(enteredYear) || enteredYear < 0 || enteredYear > currentYear) {
      throw new Error(`Por favor, ingresa un año válido entre 0 y ${currentYear}.`);
    }
  
    return true;
}
  
function isConfirmation(text) {
    const validation = text == "s" || text == "n"
    if(!validation) throw new Error("Los valores no corresponden a s/n")
}

const validationMiddleware = {
    isAlphanumeric,
    isAlphabeticWithSpaces,
    isValidLength,
    isValidRating,
    isPositiveInteger,
    isValidFormat,
    isValidYear,
    isLessThan,
    isConfirmation
};

export default validationMiddleware;