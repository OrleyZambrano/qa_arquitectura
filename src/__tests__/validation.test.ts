import { ValidationUtils } from '../validation';

describe('ValidationUtils', () => {
  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.org',
        'admin+tag@company.co.uk',
        'simple@test.io',
      ];

      validEmails.forEach((email) => {
        expect(ValidationUtils.isValidEmail(email)).toBe(true);
      });
    });

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        'invalid-email',
        '@domain.com',
        'user@',
        'user@domain',
        '',
        'user space@domain.com',
        'user..double@domain.com',
      ];

      invalidEmails.forEach((email) => {
        expect(ValidationUtils.isValidEmail(email)).toBe(false);
      });
    });

    it('should handle null and undefined inputs', () => {
      expect(ValidationUtils.isValidEmail(null as any)).toBe(false);
      expect(ValidationUtils.isValidEmail(undefined as any)).toBe(false);
    });

    it('should handle non-string inputs', () => {
      expect(ValidationUtils.isValidEmail(123 as any)).toBe(false);
      expect(ValidationUtils.isValidEmail({} as any)).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should validate strong passwords', () => {
      const strongPasswords = ['Password123!', 'MyStr0ng@Pass', 'C0mplex#2023'];

      strongPasswords.forEach((password) => {
        const result = ValidationUtils.validatePassword(password);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    it('should reject passwords that are too short', () => {
      const result = ValidationUtils.validatePassword('Abc1!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'La contraseña debe tener al menos 8 caracteres'
      );
    });

    it('should reject passwords without uppercase letters', () => {
      const result = ValidationUtils.validatePassword('password123!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'La contraseña debe contener al menos una letra mayúscula'
      );
    });

    it('should reject passwords without lowercase letters', () => {
      const result = ValidationUtils.validatePassword('PASSWORD123!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'La contraseña debe contener al menos una letra minúscula'
      );
    });

    it('should reject passwords without numbers', () => {
      const result = ValidationUtils.validatePassword('Password!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'La contraseña debe contener al menos un número'
      );
    });

    it('should reject passwords without special characters', () => {
      const result = ValidationUtils.validatePassword('Password123');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'La contraseña debe contener al menos un carácter especial'
      );
    });

    it('should handle null and undefined passwords', () => {
      const nullResult = ValidationUtils.validatePassword(null as any);
      expect(nullResult.isValid).toBe(false);
      expect(nullResult.errors).toContain('La contraseña es requerida');

      const undefinedResult = ValidationUtils.validatePassword(
        undefined as any
      );
      expect(undefinedResult.isValid).toBe(false);
      expect(undefinedResult.errors).toContain('La contraseña es requerida');
    });

    it('should accumulate multiple errors', () => {
      const result = ValidationUtils.validatePassword('weak');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });
  });

  describe('validateRequiredString', () => {
    it('should validate non-empty strings', () => {
      const result = ValidationUtils.validateRequiredString(
        'Valid String',
        'testField'
      );
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject empty strings', () => {
      const result = ValidationUtils.validateRequiredString('', 'testField');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('testField es requerido');
    });

    it('should reject strings with only whitespace', () => {
      const result = ValidationUtils.validateRequiredString('   ', 'testField');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('testField no puede estar vacío');
    });

    it('should reject null and undefined values', () => {
      const nullResult = ValidationUtils.validateRequiredString(
        null as any,
        'testField'
      );
      expect(nullResult.isValid).toBe(false);
      expect(nullResult.errors).toContain('testField es requerido');

      const undefinedResult = ValidationUtils.validateRequiredString(
        undefined as any,
        'testField'
      );
      expect(undefinedResult.isValid).toBe(false);
      expect(undefinedResult.errors).toContain('testField es requerido');
    });

    it('should reject non-string values', () => {
      const result = ValidationUtils.validateRequiredString(
        123 as any,
        'testField'
      );
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('testField es requerido');
    });

    it('should use custom field names in error messages', () => {
      const result = ValidationUtils.validateRequiredString(
        '',
        'Nombre de Usuario'
      );
      expect(result.errors).toContain('Nombre de Usuario es requerido');
    });
  });
});
