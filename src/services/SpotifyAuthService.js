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
      console.log("=== DEBUGGING CODE CHALLENGE ===");
      console.log("Input code_verifier:", codeVerifier);
      console.log("Input length:", codeVerifier.length);

      // Usar expo-crypto de la forma más simple
      const hash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        codeVerifier,
        { encoding: Crypto.CryptoEncoding.BASE64 }
      );

      console.log("SHA256 Base64 hash:", hash);
      console.log("Hash length:", hash.length);

      // Convertir a Base64URL
      const codeChallenge = hash
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      console.log("Final code_challenge:", codeChallenge);
      console.log("Final length:", codeChallenge.length);
      console.log("=== END DEBUGGING ===");

      return codeChallenge;
    } catch (error) {
      console.error("Error generando code_challenge:", error);
      throw error;
    }
  }
  generateCodeVerifier() {
    // Generar exactamente 128 caracteres usando solo [A-Za-z0-9-._~]
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    let result = "";

    // Usar crypto si está disponible, sino Math.random()
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

      console.log("Debug - Code verifier length:", codeVerifier.length);
      console.log("Debug - Original hash:", hash);
      console.log("Debug - Code challenge:", codeChallenge);

      return { codeVerifier, codeChallenge };
    } catch (error) {
      console.error("Error generando code_challenge:", error);
      throw error;
    }
  }

  // Iniciar proceso de autenticación (PKCE con implementación nativa)
  async authenticate() {
    try {
      // Obtener la URI de redirección correcta automáticamente
      const redirectUri = AuthSession.makeRedirectUri({
        scheme: "exp",
        path: "spotify-auth",
      });

      console.log("Redirect URI:", redirectUri);
      console.log("Usando PKCE NATIVO de expo-auth-session");

      // Crear request con PKCE automático
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

      console.log("Request configurado con PKCE automático");
      console.log("Code challenge method:", request.codeChallengeMethod);
      console.log("Code challenge:", request.codeChallenge);

      // Ejecutar la autenticación
      const result = await request.promptAsync({
        authorizationEndpoint: SPOTIFY_CONFIG.ENDPOINTS.AUTHORIZE,
      });

      if (result.type === "success") {
        const code = result.params?.code;
        if (code) {
          console.log(
            "Código de autorización recibido:",
            code.substring(0, 20) + "..."
          );
          console.log("Code verifier automático:", request.codeVerifier);
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
      console.error("Error en autenticación Spotify:", error);
      throw error;
    }
  }

  // Intercambiar código por token (PKCE sin client_secret)
  async exchangeCodeForToken(code, codeVerifier, redirectUri = null) {
    try {
      console.log("Intercambiando código por token...");
      console.log("Usando PKCE (requerido por Spotify)");
      console.log("Code verifier length:", codeVerifier?.length || "null");

      const actualRedirectUri = redirectUri || SPOTIFY_CONFIG.REDIRECT_URI;
      console.log("Using redirect URI:", actualRedirectUri);

      // Para PKCE: usar code_verifier, NO client_secret
      const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: actualRedirectUri,
        client_id: SPOTIFY_CONFIG.CLIENT_ID,
        code_verifier: codeVerifier, // PKCE requiere code_verifier
        // NO incluir client_secret con PKCE
      });

      console.log("Enviando request a:", SPOTIFY_CONFIG.ENDPOINTS.TOKEN);
      console.log("Body params:", Object.fromEntries(body.entries()));
      console.log("IMPORTANTE - Usando code_verifier (PKCE), NO client_secret");

      const response = await fetch(SPOTIFY_CONFIG.ENDPOINTS.TOKEN, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Token obtenido exitosamente");
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
        console.error("Error en token exchange:", data);
        throw new Error(data.error_description || "Error al obtener token");
      }
    } catch (error) {
      console.error("Error al intercambiar código por token:", error);
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
        console.error("Error al obtener perfil:", data);
        throw new Error(data.error?.message || "Error al obtener perfil");
      }
    } catch (error) {
      console.error("Error al obtener perfil de usuario:", error);
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
