import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dniNieValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dniValido = esDniValido(control.value);
    const nieValido = esNieValido(control.value);
    if (dniValido || nieValido) {
      return null;
    } else {
      return { invalidDni: true };
    }
  };
}

function esDniValido(dni: any) {
  const validDniPattern = /^[0-9]{8}[A-Za-z]$/; // 8 números seguidos de una letra
  const dniLetters = 'TRWAGMYFPDXBNJZSQVHLCKE'; // Letras válidas para el cálculo del DNI
  // Validar el formato del DNI
  if (!validDniPattern.test(dni)) {
    return false; // Error si el formato no es válido
  }
  // Extraer la parte numérica y la letra
  const dniNumber = parseInt(dni.substring(0, 8), 10);
  const dniLetter = dni.charAt(8).toUpperCase();
  // Calcular la letra que corresponde al número y verificar si coincide
  const expectedLetter = dniLetters[dniNumber % 23];
  if (dniLetter !== expectedLetter) {
    return false; // Error si la letra no coincide
  }
  return true;
}

function esNieValido(nie: any) {
  const validNiePattern = /^[XYZ][0-9]{7}[A-Z]$/;
  const dniLetters = 'TRWAGMYFPDXBNJZSQVHLCKE'; // Letras válidas para el cálculo del NIE
  if (!validNiePattern.test(nie)) {
    return false; // Error si el formato no es válido
  }
  // Reemplazar la letra inicial por el número correspondiente
  let nieNumber = nie.substring(1, 8); // Extraer los 7 números
  switch (nie.charAt(0)) {
    case 'X':
      nieNumber = '0' + nieNumber;
      break;
    case 'Y':
      nieNumber = '1' + nieNumber;
      break;
    case 'Z':
      nieNumber = '2' + nieNumber;
      break;
  }
  // Calcular la letra esperada del NIE
  const nieLetter = nie.charAt(8).toUpperCase();
  const expectedLetter = dniLetters[parseInt(nieNumber) % 23];
  // Comparar la letra calculada con la letra proporcionada
  if (nieLetter !== expectedLetter) {
    return false; // Error si la letra no coincide
  }
  return true;
}
