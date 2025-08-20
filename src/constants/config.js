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

export const SPOTIFY_CONFIG = {
  BASE_URL: "https://api.spotify.com/v1",
  CLIENT_ID: "41eb735cde9a439a912f43fb77f6edb1", // Verificar que este sea el correcto del Dashboard
  // CLIENT_SECRET removido - nueva app PKCE no necesita secret
  REDIRECT_URI: "exp://192.168.1.130:8081/--/spotify-auth", // Usar la IP que aparece en los logs
  SCOPES: [
    "user-read-private",
    "user-read-email",
    "playlist-read-private",
    "user-top-read",
    "user-read-recently-played",
  ],
  ENDPOINTS: {
    AUTHORIZE: "https://accounts.spotify.com/authorize",
    TOKEN: "https://accounts.spotify.com/api/token",
  },
};
