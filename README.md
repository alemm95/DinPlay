# DinPlay - React Native with Expo v53

Boilerplate de React Native creado con Expo v53, optimizado para ser compatible con Expo Go en iOS y Android.

## 🚀 Características

- **Expo v53**: La última versión estable de Expo
- **React Native 0.79.5**: Versión más reciente compatible
- **React 19**: Última versión con las nuevas características
- **Expo Go Compatible**: Funciona perfectamente con la app Expo Go en iOS y Android
- **Componentes Nativos**: Usa componentes nativos de React Native para máxima compatibilidad
- **Estructura Profesional**: Arquitectura escalable y organizada en carpetas
- **Componentes Reutilizables**: Button, Card y otros componentes comunes
- **Gestión de Estado**: Context API configurado para autenticación
- **Custom Hooks**: Hooks reutilizables para lógica común
- **Estilos Globales**: Sistema de diseño consistente

## 📱 Componentes Incluidos

El proyecto incluye una estructura profesional con:

### 🧩 **Componentes Reutilizables:**

- **Button**: Componente de botón con múltiples variantes (primary, secondary, outline)
- **Card**: Tarjetas con header y body personalizables
- Fácil extensión para más componentes

### 🎨 **Sistema de Diseño:**

- **Colores**: Paleta de colores consistente
- **Tipografía**: Tamaños y fuentes estandarizadas
- **Espaciado**: Sistema de margin y padding unificado
- **Sombras**: Efectos de elevación predefinidos

### 🪝 **Custom Hooks:**

- **useLoading**: Manejo de estados de carga
- **useDebounce**: Debounce para inputs
- **useForm**: Gestión de formularios con validación
- **useFetch**: Peticiones HTTP simplificadas

### 🔗 **Gestión de Estado:**

- **AuthContext**: Context para autenticación
- **Reducers**: Gestión de estado predecible
- Preparado para escalabilidad

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Expo Go app en tu dispositivo móvil

### Pasos de Instalación

1. Las dependencias ya están instaladas en este proyecto
2. Para ejecutar el servidor de desarrollo:
   ```bash
   npm start
   ```

### Ejecutar en Dispositivos

#### iOS (Expo Go)

1. Descarga Expo Go desde el App Store
2. Ejecuta `npm start`
3. Escanea el código QR con la cámara de tu iPhone
4. La app se abrirá automáticamente en Expo Go

#### Android (Expo Go)

1. Descarga Expo Go desde Google Play Store
2. Ejecuta `npm start`
3. Escanea el código QR con la app Expo Go
4. La app se abrirá automáticamente

#### Web

```bash
npm run web
```

## 📁 Estructura del Proyecto

```
DinPlay/
├── App.js                 # Componente principal de la app
├── app.json              # Configuración de Expo
├── package.json          # Dependencias del proyecto
├── FOLDER_STRUCTURE.md   # Documentación de la estructura
├── assets/               # Imágenes y iconos principales
│   ├── icon.png
│   ├── splash-icon.png
│   ├── adaptive-icon.png
│   └── favicon.png
├── src/                  # Código fuente organizado
│   ├── assets/           # Recursos estáticos (fuentes, iconos, imágenes)
│   ├── components/       # Componentes reutilizables
│   │   └── common/       # Componentes comunes (Button, Card)
│   ├── constants/        # Constantes globales (colores, config)
│   ├── context/          # Context API (AuthContext)
│   ├── hooks/            # Custom hooks reutilizables
│   ├── navigation/       # Configuración de navegación
│   ├── screens/          # Pantallas de la aplicación
│   ├── services/         # APIs y servicios externos
│   ├── styles/           # Estilos globales
│   ├── types/            # Tipos TypeScript (opcional)
│   └── utils/            # Funciones de utilidad
└── .github/
    └── copilot-instructions.md
```

## 🔧 Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo de Expo
- `npm run android`: Abre en emulador Android
- `npm run ios`: Abre en simulador iOS (requiere macOS)
- `npm run web`: Abre en navegador web

## 📚 Documentación de Dependencias

- [Expo Documentation](https://docs.expo.dev/)
- [React Native](https://reactnative.dev/)
- [📁 Estructura de Carpetas](./FOLDER_STRUCTURE.md) - **Guía completa de la arquitectura**

## 🎨 Personalización

### Colores y Tema

Los colores se pueden personalizar editando `src/constants/theme.js`:

```javascript
export const COLORS = {
  primary: "#007AFF", // Color principal
  secondary: "#5856D6", // Color secundario
  background: "#F8F9FA", // Fondo
  // ... más colores
};
```

### Añadir Nuevos Componentes

1. **Crear el componente** en `src/components/common/`:

```javascript
// src/components/common/NewComponent.js
import React from "react";
import { View } from "react-native";

const NewComponent = () => {
  return <View>...</View>;
};

export default NewComponent;
```

2. **Exportarlo** en `src/components/common/index.js`:

```javascript
export { default as NewComponent } from "./NewComponent";
```

3. **Usarlo** en cualquier pantalla:

```javascript
import { NewComponent } from "../components/common";
```

### Configuración de App

Edita `app.json` para cambiar:

- Nombre de la app
- Iconos
- Splash screen
- Bundle identifier para builds nativas

## ⚠️ Notas Importantes

- Este proyecto está optimizado para Expo Go, por lo que algunas librerías nativas pueden no estar disponible
- Para funcionalidades nativas adicionales, considera usar EAS Build
- El proyecto usa la nueva arquitectura de React Native (New Architecture) habilitada
- **Componentes Nativos**: Usa solo componentes nativos de React Native para máxima compatibilidad

## 🆘 Resolución de Problemas

### Problemas Comunes

1. **Error de versión de dependencias**: Ejecuta `npm install` para actualizar
2. **QR Code no funciona**: Asegúrate de estar en la misma red WiFi
3. **App no carga en Expo Go**: Verifica que no hay errores en la consola
4. **App se cierra inmediatamente**: Verifica que el código no tenga errores de sintaxis

### Logs y Debugging

- Los logs aparecen en la terminal donde ejecutaste `npm start`
- Presiona `j` en la terminal para abrir las herramientas de debugging
- Usa `r` para recargar la app

## 📄 Licencia

Este es un proyecto de boilerplate para uso libre.
