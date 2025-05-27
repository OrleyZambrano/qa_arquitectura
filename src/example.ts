// Ejemplo con problemas de calidad para demostrar hooks
export class Example {
  // Variable no utilizada - ESLint lo detectará
  private unusedVariable = 'test';

  // Función mal formateada - Prettier la corregirá
  public badlyFormatted(a: number, b: number): number {
    return a + b;
  }

  // Función sin validación
  public divide(a: number, b: number): number {
    return a / b; // División por cero no validada
  }
}
