/**
 * Clase Calculator para demostrar conceptos de calidad de software
 * Incluye validaciones, manejo de errores y documentación
 */
export class Calculator {
  /**
   * Suma dos números
   * @param a Primer número
   * @param b Segundo número
   * @returns La suma de a y b
   * @throws Error si los parámetros no son números válidos
   */
  public add(a: number, b: number): number {
    this.validateNumber(a, 'a');
    this.validateNumber(b, 'b');
    return a + b;
  }

  /**
   * Resta dos números
   * @param a Primer número
   * @param b Segundo número
   * @returns La resta de a - b
   * @throws Error si los parámetros no son números válidos
   */
  public subtract(a: number, b: number): number {
    this.validateNumber(a, 'a');
    this.validateNumber(b, 'b');
    return a - b;
  }

  /**
   * Multiplica dos números
   * @param a Primer número
   * @param b Segundo número
   * @returns El producto de a * b
   * @throws Error si los parámetros no son números válidos
   */
  public multiply(a: number, b: number): number {
    this.validateNumber(a, 'a');
    this.validateNumber(b, 'b');
    return a * b;
  }

  /**
   * Divide dos números
   * @param a Dividendo
   * @param b Divisor
   * @returns El cociente de a / b
   * @throws Error si b es cero o si los parámetros no son números válidos
   */
  public divide(a: number, b: number): number {
    this.validateNumber(a, 'a');
    this.validateNumber(b, 'b');

    if (b === 0) {
      throw new Error('División por cero no permitida');
    }

    return a / b;
  }

  /**
   * Calcula la potencia de un número
   * @param base Base
   * @param exponent Exponente
   * @returns base elevado a exponent
   * @throws Error si los parámetros no son números válidos
   */
  public power(base: number, exponent: number): number {
    this.validateNumber(base, 'base');
    this.validateNumber(exponent, 'exponent');
    return Math.pow(base, exponent);
  }

  /**
   * Calcula la raíz cuadrada de un número
   * @param value Número del cual calcular la raíz
   * @returns La raíz cuadrada del número
   * @throws Error si el número es negativo o no es válido
   */
  public sqrt(value: number): number {
    this.validateNumber(value, 'value');

    if (value < 0) {
      throw new Error(
        'No se puede calcular la raíz cuadrada de un número negativo'
      );
    }

    return Math.sqrt(value);
  }

  /**
   * Valida que un valor sea un número válido
   * @param value Valor a validar
   * @param paramName Nombre del parámetro para el mensaje de error
   * @throws Error si el valor no es un número válido
   */
  private validateNumber(value: number, paramName: string): void {
    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
      throw new Error(`El parámetro '${paramName}' debe ser un número válido`);
    }
  }
}
