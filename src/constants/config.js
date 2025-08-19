// URLs de API y configuraciones
export const API_CONFIG = {
  BASE_URL: __DEV__ ? "http://localhost:3000/api" : "https://api.dinplay.com",
  TIMEOUT: 10000,
  VERSION: "v1",
};

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },
  USER: {
    PROFILE: "/user/profile",
    UPDATE: "/user/update",
  },
  // Agrega más endpoints aquí
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "@dinplay/access_token",
  REFRESH_TOKEN: "@dinplay/refresh_token",
  USER_DATA: "@dinplay/user_data",
  SETTINGS: "@dinplay/settings",
};

export const SCREEN_NAMES = {
  // Auth Stack
  LOGIN: "Login",
  REGISTER: "Register",

  // Main Stack
  HOME: "Home",
  PROFILE: "Profile",
  SETTINGS: "Settings",

  // Tab Navigator
  HOME_TAB: "HomeTab",
  PROFILE_TAB: "ProfileTab",
};
