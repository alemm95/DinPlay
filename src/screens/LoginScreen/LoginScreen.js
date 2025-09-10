import React from "react";
import { useSpotifyAuth, useAuthNavigation } from "../../hooks";
import AuthLayout from "../../components/layouts/AuthLayout";
import AppLogo from "../../components/layouts/AppLogo";
import { AuthCard, SpotifyButton } from "../../components/auth";

const LoginScreen = ({ navigation }) => {
  const { login, loading } = useSpotifyAuth();
  useAuthNavigation(navigation);

  return (
    <AuthLayout>
      <AppLogo />
      <AuthCard
        subtitle={`DinPlay es una app que te permitirá gestionar tus plataformas favoritas de música. ${"\n\n"} Descubre nuevas canciones y artistas fácilmente, así como nuevas funcionalidades.`}
        buttonText={loading ? "Conectando con Spotify..." : "Login con Spotify"}
        onButtonPress={login}
        loading={loading}
      />
    </AuthLayout>
  );
};

export default LoginScreen;
