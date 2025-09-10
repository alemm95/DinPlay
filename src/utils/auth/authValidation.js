/**
 * Formatea errores de autenticación para mostrar al usuario
 * @param {string|Object} error - Error de autenticación
 * @returns {string} - Mensaje de error formateado
 */
export const formatAuthError = (error) => {
  if (typeof error === "string") return error;
  if (error?.message) return error.message;
  return "Error de autenticación desconocido";
};

/**
 * Valida si un email tiene formato válido
 * @param {string} email - Email a validar
 * @returns {boolean} - true si es válido
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida la fortaleza de una contraseña
 * @param {string} password - Contraseña a validar
 * @returns {Array} - Array de errores de validación
 */
export const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) {
    errors.push("La contraseña debe tener al menos 8 caracteres");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("La contraseña debe tener al menos una mayúscula");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("La contraseña debe tener al menos un número");
  }
  return errors;
};
