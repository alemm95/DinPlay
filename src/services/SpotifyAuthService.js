import * as AuthSession from "expo-auth-session";
import * as Crypto from "expo-crypto";
import { SPOTIFY_CONFIG } from "../constants/config";

class SpotifyAuthService {
  constructor() {
    this.accessToken = null;
    this.refreshToken = null;
    this.expiresAt = null;
    this.currentCodeVerifier = null; // Volver a usar PKCE
  }

  // Generar code verifier simple (solo letras y números)
  generateSimpleCodeVerifier() {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    // Generar exactamente 128 caracteres
    for (let i = 0; i < 128; i++) {
      result += charset[Math.floor(Math.random() * charset.length)];
    }

    return result;
  }

  // Generar code challenge simple
  async generateSimpleCodeChallenge(codeVerifier) {
    try {
      const hash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        codeVerifier,
        { encoding: Crypto.CryptoEncoding.BASE64 }
      );

      // Convertir a Base64URL
      const codeChallenge = hash
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      return codeChallenge;
    } catch (error) {
      throw error;
    }
  }
  generateCodeVerifier() {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    let result = "";

    for (let i = 0; i < 128; i++) {
      if (typeof crypto !== "undefined" && crypto.getRandomValues) {
        const randomArray = new Uint8Array(1);
        crypto.getRandomValues(randomArray);
        result += charset[randomArray[0] % charset.length];
      } else {
        result += charset[Math.floor(Math.random() * charset.length)];
      }
    }

    return result;
  }

  async generateCodeChallenge() {
    const codeVerifier = this.generateCodeVerifier();

    try {
      // Usar el método más simple y directo con expo-crypto
      const hash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        codeVerifier,
        { encoding: Crypto.CryptoEncoding.BASE64 }
      );

      // Convertir a Base64URL según RFC 7636
      const codeChallenge = hash
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      return { codeVerifier, codeChallenge };
    } catch (error) {
      console.error("Error generando code_challenge:", error);
      throw error;
    }
  }

  async authenticate() {
    try {
      const redirectUri = AuthSession.makeRedirectUri({
        scheme: "exp",
        path: "spotify-auth",
      });
      const request = new AuthSession.AuthRequest({
        clientId: SPOTIFY_CONFIG.CLIENT_ID,
        scopes: SPOTIFY_CONFIG.SCOPES,
        redirectUri: redirectUri,
        responseType: AuthSession.ResponseType.Code,
        usePKCE: true, // Habilitar PKCE automático
        extraParams: {
          show_dialog: "true",
        },
      });

      // Ejecutar la autenticación
      const result = await request.promptAsync({
        authorizationEndpoint: SPOTIFY_CONFIG.ENDPOINTS.AUTHORIZE,
      });

      if (result.type === "success") {
        const code = result.params?.code;
        if (code) {
          return await this.exchangeCodeForToken(
            code,
            request.codeVerifier,
            redirectUri
          );
        } else {
          throw new Error("No se recibió el código de autorización");
        }
      } else {
        throw new Error("Autenticación cancelada");
      }
    } catch (error) {
      throw error;
    }
  }

  // Intercambiar código por token (PKCE sin client_secret)
  async exchangeCodeForToken(code, codeVerifier, redirectUri = null) {
    try {
      const actualRedirectUri = redirectUri || SPOTIFY_CONFIG.REDIRECT_URI;

      const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: actualRedirectUri,
        client_id: SPOTIFY_CONFIG.CLIENT_ID,
        code_verifier: codeVerifier, // PKCE requiere code_verifier
        // NO incluir client_secret con PKCE
      });

      const response = await fetch(SPOTIFY_CONFIG.ENDPOINTS.TOKEN, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      const data = await response.json();

      if (response.ok) {
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        this.expiresAt = Date.now() + data.expires_in * 1000;

        return {
          success: true,
          accessToken: this.accessToken,
          refreshToken: this.refreshToken,
          expiresAt: this.expiresAt,
        };
      } else {
        throw new Error(data.error_description || "Error al obtener token");
      }
    } catch (error) {
      throw error;
    }
  }

  // Obtener información del usuario
  async getUserProfile() {
    try {
      if (!this.isTokenValid()) {
        throw new Error("Token no válido o expirado");
      }

      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.error?.message || "Error al obtener perfil");
      }
    } catch (error) {
      throw error;
    }
  }

  // Verificar si el token es válido
  isTokenValid() {
    return this.accessToken && this.expiresAt && Date.now() < this.expiresAt;
  }

  // Refrescar token
  async refreshAccessToken() {
    if (!this.refreshToken) {
      throw new Error("No hay refresh token disponible");
    }

    try {
      const response = await fetch(SPOTIFY_CONFIG.ENDPOINTS.TOKEN, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: this.refreshToken,
          client_id: SPOTIFY_CONFIG.CLIENT_ID,
        }).toString(),
      });

      const data = await response.json();

      if (response.ok) {
        this.accessToken = data.access_token;
        this.expiresAt = Date.now() + data.expires_in * 1000;

        // El refresh token puede o no ser renovado
        if (data.refresh_token) {
          this.refreshToken = data.refresh_token;
        }

        return {
          success: true,
          accessToken: this.accessToken,
        };
      } else {
        throw new Error(data.error_description || "Error al refrescar token");
      }
    } catch (error) {
      console.error("Error al refrescar token:", error);
      this.logout(); // Limpiar tokens si falla el refresh
      throw error;
    }
  }

  // Obtener access token actual
  getAccessToken() {
    return this.accessToken;
  }

  // Obtener refresh token actual
  getRefreshToken() {
    return this.refreshToken;
  }

  // Obtener fecha de expiración
  getExpiresAt() {
    return this.expiresAt;
  }

  // Verificar si está autenticado
  isAuthenticated() {
    return this.isTokenValid();
  }

  // Cerrar sesión
  logout() {
    this.accessToken = null;
    this.refreshToken = null;
    this.expiresAt = null;
    this.currentCodeVerifier = null; // Limpiar el code_verifier
  }
}

export default new SpotifyAuthService();
