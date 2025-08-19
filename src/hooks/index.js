import { useState, useEffect } from "react";

// Hook para manejar estado de carga
export const useLoading = (initialState = false) => {
  const [loading, setLoading] = useState(initialState);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return {
    loading,
    startLoading,
    stopLoading,
    setLoading,
  };
};

// Hook para debounce
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook para manejar formularios
export const useForm = (initialValues = {}, validation = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const setValue = (field, value) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Limpiar error si existe
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const setFieldTouched = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const validateField = (field, value) => {
    if (validation[field]) {
      const error = validation[field](value);
      setErrors((prev) => ({
        ...prev,
        [field]: error || "",
      }));
      return !error;
    }
    return true;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validation).forEach((field) => {
      const error = validation[field](values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    setValue,
    setFieldTouched,
    validateField,
    validateForm,
    reset,
  };
};

// Hook para fetch de datos
export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const executeFetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    executeFetch();
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch: executeFetch,
  };
};
