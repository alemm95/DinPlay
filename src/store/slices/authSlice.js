import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SpotifyAuthService from "../../services/SpotifyAuthService";

// Estado inicial
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  token: null,
};

// Thunks asíncronos
export const loginWithSpotify = createAsyncThunk(
  "auth/loginWithSpotify",
  async (_, { rejectWithValue }) => {
    try {
      // Autenticar con Spotify
      const authResult = await SpotifyAuthService.authenticate();

      if (authResult.success) {
        // Obtener información del usuario
        const userProfile = await SpotifyAuthService.getUserProfile();

        // Obtener el token almacenado
        const token = SpotifyAuthService.getAccessToken();

        return {
          user: {
            id: userProfile.id,
            name: userProfile.display_name,
            email: userProfile.email,
            image: userProfile.images?.[0]?.url,
            country: userProfile.country,
            followers: userProfile.followers?.total || 0,
            premium: userProfile.product === "premium",
            spotifyUri: userProfile.uri,
            externalUrl: userProfile.external_urls?.spotify,
          },
          token,
        };
      } else {
        throw new Error("Error en la autenticación con Spotify");
      }
    } catch (error) {
      console.error("Error en loginWithSpotify:", error);
      return rejectWithValue(
        error.message || "Error al iniciar sesión con Spotify"
      );
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const isValid = SpotifyAuthService.isTokenValid();
      
      if (!isValid) {
        // No hay token válido, devolver estado no autenticado
        return { isAuthenticated: false };
      }

      // Solo si hay token válido, intentar obtener el perfil
      const userProfile = await SpotifyAuthService.getUserProfile();
      const token = SpotifyAuthService.getAccessToken();
      
      return {
        user: {
          id: userProfile.id,
          name: userProfile.display_name,
          email: userProfile.email,
          image: userProfile.images?.[0]?.url,
          country: userProfile.country,
          followers: userProfile.followers?.total || 0,
          premium: userProfile.product === 'premium',
          spotifyUri: userProfile.uri,
          externalUrl: userProfile.external_urls?.spotify,
        },
        token,
        isAuthenticated: true,
      };
    } catch (error) {
      console.log('No hay sesión válida o token expirado');
      return { isAuthenticated: false };
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      SpotifyAuthService.logout();
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login with Spotify
      .addCase(loginWithSpotify.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithSpotify.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginWithSpotify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      // Check auth status
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        
        if (action.payload.isAuthenticated) {
          // Usuario autenticado con datos válidos
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        } else {
          // No hay sesión válida
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = null; // No mostrar error por no estar autenticado
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError, setLoading, updateUserProfile } =
  authSlice.actions;

// Selectores
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
