/**
 * Utilidades para validación de datos
 * Demuestra principios SOLID y buenas prácticas
 */
export class ValidationUtils {
  /**
   * Valida si un email tiene formato válido
   * @param email Email a validar
   * @returns true si el email es válido
   */ public static isValidEmail(email: string): boolean {
    if (!email || typeof email !== 'string') {
      return false;
    }

    const trimmedEmail = email.trim();

    // Verificar que no esté vacío después de trim
    if (trimmedEmail.length === 0) {
      return false;
    }

    // Verificar que no tenga espacios
    if (trimmedEmail.includes(' ')) {
      return false;
    }

    // Verificar que no tenga doble punto consecutivo
    if (trimmedEmail.includes('..')) {
      return false;
    }

    // Regex más estricta para email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(trimmedEmail);
  }

  /**
   * Valida si una contraseña cumple los criterios de seguridad
   * @param password Contraseña a validar
   * @returns Objeto con el resultado de la validación y errores
   */
  public static validatePassword(password: string): ValidationResult {
    const errors: string[] = [];

    if (!password || typeof password !== 'string') {
      errors.push('La contraseña es requerida');
      return { isValid: false, errors };
    }

    if (password.length < 8) {
      errors.push('La contraseña debe tener al menos 8 caracteres');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('La contraseña debe contener al menos una letra mayúscula');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('La contraseña debe contener al menos una letra minúscula');
    }

    if (!/\d/.test(password)) {
      errors.push('La contraseña debe contener al menos un número');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('La contraseña debe contener al menos un carácter especial');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Valida si un string no está vacío y tiene contenido válido
   * @param value Valor a validar
   * @param fieldName Nombre del campo para mensajes de error
   * @returns Resultado de la validación
   */
  public static validateRequiredString(
    value: string,
    fieldName: string
  ): ValidationResult {
    const errors: string[] = [];

    if (!value || typeof value !== 'string') {
      errors.push(`${fieldName} es requerido`);
      return { isValid: false, errors };
    }

    if (value.trim().length === 0) {
      errors.push(`${fieldName} no puede estar vacío`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

/**
 * Interfaz para el resultado de validaciones
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
