import { Calculator } from '../calculator';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('add', () => {
    it('should add two positive numbers correctly', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    it('should add negative numbers correctly', () => {
      expect(calculator.add(-2, -3)).toBe(-5);
    });

    it('should add positive and negative numbers correctly', () => {
      expect(calculator.add(5, -3)).toBe(2);
    });

    it('should throw error for invalid first parameter', () => {
      expect(() => calculator.add(NaN, 3)).toThrow(
        "El parámetro 'a' debe ser un número válido"
      );
    });

    it('should throw error for invalid second parameter', () => {
      expect(() => calculator.add(3, Infinity)).toThrow(
        "El parámetro 'b' debe ser un número válido"
      );
    });
  });

  describe('subtract', () => {
    it('should subtract two numbers correctly', () => {
      expect(calculator.subtract(10, 3)).toBe(7);
    });

    it('should handle negative results', () => {
      expect(calculator.subtract(3, 10)).toBe(-7);
    });
  });

  describe('multiply', () => {
    it('should multiply two positive numbers correctly', () => {
      expect(calculator.multiply(4, 5)).toBe(20);
    });

    it('should multiply by zero', () => {
      expect(calculator.multiply(5, 0)).toBe(0);
    });

    it('should multiply negative numbers', () => {
      expect(calculator.multiply(-3, -4)).toBe(12);
    });
  });

  describe('divide', () => {
    it('should divide two numbers correctly', () => {
      expect(calculator.divide(15, 3)).toBe(5);
    });

    it('should handle decimal results', () => {
      expect(calculator.divide(7, 2)).toBe(3.5);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => calculator.divide(5, 0)).toThrow(
        'División por cero no permitida'
      );
    });

    it('should throw error for invalid divisor', () => {
      expect(() => calculator.divide(5, NaN)).toThrow(
        "El parámetro 'b' debe ser un número válido"
      );
    });
  });

  describe('power', () => {
    it('should calculate power correctly', () => {
      expect(calculator.power(2, 3)).toBe(8);
    });

    it('should handle power of zero', () => {
      expect(calculator.power(5, 0)).toBe(1);
    });

    it('should handle negative exponents', () => {
      expect(calculator.power(2, -2)).toBe(0.25);
    });
  });

  describe('sqrt', () => {
    it('should calculate square root correctly', () => {
      expect(calculator.sqrt(16)).toBe(4);
    });

    it('should handle square root of zero', () => {
      expect(calculator.sqrt(0)).toBe(0);
    });

    it('should throw error for negative numbers', () => {
      expect(() => calculator.sqrt(-4)).toThrow(
        'No se puede calcular la raíz cuadrada de un número negativo'
      );
    });

    it('should throw error for invalid input', () => {
      expect(() => calculator.sqrt(NaN)).toThrow(
        "El parámetro 'value' debe ser un número válido"
      );
    });
  });
});
