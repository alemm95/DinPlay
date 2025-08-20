import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import SpotifyAuthService from "../services/SpotifyAuthService";

// Estado inicial
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Tipos de acciones
const ActionTypes = {
  SET_LOADING: "SET_LOADING",
  SET_USER: "SET_USER",
  SET_ERROR: "SET_ERROR",
  LOGOUT: "LOGOUT",
  CLEAR_ERROR: "CLEAR_ERROR",
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        loading: false,
        error: null,
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };

    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Contexto
const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const isValid = SpotifyAuthService.isTokenValid();
    setIsAuthenticated(isValid);
    if (!isValid) {
      setUser(null);
    }
  };

  // Acciones
  const setLoading = (loading) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: loading });
  };

  // const setUser = (user) => {
  //   dispatch({ type: ActionTypes.SET_USER, payload: user });
  // };

  const setError = (error) => {
    dispatch({ type: ActionTypes.SET_ERROR, payload: error });
  };

  const logout = () => {
    SpotifyAuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const clearError = () => {
    dispatch({ type: ActionTypes.CLEAR_ERROR });
  };

  // Métodos de autenticación
  const login = async (credentials) => {
    try {
      setLoading(true);
      // Autenticar con Spotify
      const authResult = await SpotifyAuthService.authenticate();

      if (authResult.success) {
        // Obtener información del usuario
        const userProfile = await SpotifyAuthService.getUserProfile();

        setUser({
          id: userProfile.id,
          name: userProfile.display_name,
          email: userProfile.email,
          image: userProfile.images?.[0]?.url,
          country: userProfile.country,
          followers: userProfile.followers?.total,
          premium: userProfile.product === "premium",
        });

        setIsAuthenticated(true);
        return { success: true, user: userProfile };
      }
    } catch (error) {
      console.error("Error en login:", error);
      return {
        success: false,
        error: error.message || "Error al iniciar sesión con Spotify",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      // Aquí iría la llamada a la API
      // const response = await apiService.register(userData);
      // setUser(response.data.user);

      // Simulación por ahora
      setTimeout(() => {
        setUser({ id: 1, name: userData.name, email: userData.email });
      }, 1000);
    } catch (error) {
      setError(error.message);
    }
  };

  const value = {
    ...state,
    user,
    isLoading,
    isAuthenticated,
    setLoading,
    setUser,
    setError,
    logout,
    clearError,
    login,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
