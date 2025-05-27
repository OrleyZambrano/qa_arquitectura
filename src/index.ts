import { Calculator } from './calculator';
import { ValidationUtils } from './validation';

/**
 * Archivo principal que demuestra el uso de las clases
 */
function main(): void {
  console.log('=== Ejemplo de Calidad de Software ===\n');

  // Ejemplo de uso de Calculator
  const calculator = new Calculator();

  try {
    console.log('Operaciones matemáticas:');
    console.log(`5 + 3 = ${calculator.add(5, 3)}`);
    console.log(`10 - 4 = ${calculator.subtract(10, 4)}`);
    console.log(`6 * 7 = ${calculator.multiply(6, 7)}`);
    console.log(`15 / 3 = ${calculator.divide(15, 3)}`);
    console.log(`2^8 = ${calculator.power(2, 8)}`);
    console.log(`√16 = ${calculator.sqrt(16)}`);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error desconocido';
    console.error('Error en cálculo:', errorMessage);
  }

  console.log('\n--- Validaciones ---');

  // Ejemplo de validación de email
  const emails = ['test@example.com', 'invalid-email', 'user@domain.org'];
  emails.forEach((email) => {
    const isValid = ValidationUtils.isValidEmail(email);
    console.log(`Email '${email}': ${isValid ? 'Válido' : 'Inválido'}`);
  });

  // Ejemplo de validación de contraseña
  const passwords = ['123', 'Password123!', 'weak'];
  passwords.forEach((password) => {
    const result = ValidationUtils.validatePassword(password);
    console.log(`\nContraseña '${password}':`);
    console.log(`- Válida: ${result.isValid}`);
    if (!result.isValid) {
      result.errors.forEach((error) => console.log(`- Error: ${error}`));
    }
  });
}

// Ejecutar solo si este archivo es el punto de entrada
if (require.main === module) {
  main();
}
