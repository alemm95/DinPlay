# 📁 Estructura de Carpetas - React Native

Esta es una estructura de carpetas profesional y escalable para proyectos de React Native.

## 📂 Estructura Completa

```
src/
├── assets/               # Recursos estáticos
│   ├── fonts/           # Fuentes personalizadas
│   ├── icons/           # Iconos de la app
│   └── images/          # Imágenes y gráficos
├── components/          # Componentes reutilizables
│   └── common/          # Componentes comunes (Button, Card, etc.)
├── constants/           # Constantes globales
│   ├── config.js        # Configuración de API y constantes
│   └── theme.js         # Colores, fuentes, tamaños
├── context/             # Context API de React
│   └── AuthContext.js   # Contexto de autenticación
├── hooks/               # Custom hooks
│   └── index.js         # Hooks reutilizables
├── navigation/          # Configuración de navegación
├── screens/             # Pantallas de la aplicación
│   ├── HomeScreen.js    # Pantalla principal
│   └── index.js         # Exportaciones
├── services/            # Servicios y APIs
│   └── api.js           # Servicio de API
├── styles/              # Estilos globales
│   └── globalStyles.js  # Estilos reutilizables
├── types/               # Tipos TypeScript (opcional)
│   └── index.js         # Definiciones de tipos
└── utils/               # Funciones de utilidad
    └── helpers.js       # Funciones auxiliares
```

## 📋 Descripción de Carpetas

### 🎨 `assets/`

Contiene todos los recursos estáticos de la aplicación:

- **fonts/**: Fuentes personalizadas (.ttf, .otf)
- **icons/**: Iconos específicos de la app
- **images/**: Imágenes, logos, ilustraciones

### 🧩 `components/`

Componentes React reutilizables:

- **common/**: Componentes básicos (Button, Card, Input, etc.)
- Organizados por funcionalidad o tipo

### ⚙️ `constants/`

Constantes y configuraciones globales:

- **config.js**: URLs de API, configuraciones, endpoints
- **theme.js**: Colores, fuentes, tamaños, sombras

### 🔗 `context/`

Context API para gestión de estado global:

- **AuthContext.js**: Autenticación y usuario
- Otros contextos según necesidad

### 🪝 `hooks/`

Custom hooks para lógica reutilizable:

- useLoading, useDebounce, useForm, useFetch
- Lógica compartida entre componentes

### 🧭 `navigation/`

Configuración de navegación de la app:

- Stack navigators, Tab navigators
- Configuración de rutas

### 📱 `screens/`

Pantallas principales de la aplicación:

- Cada pantalla en su propio archivo
- Organizadas por flujo o funcionalidad

### 🌐 `services/`

Servicios externos y APIs:

- **api.js**: Cliente HTTP, endpoints
- Servicios de terceros

### 🎨 `styles/`

Estilos globales y temas:

- **globalStyles.js**: Estilos reutilizables
- Temas y configuraciones de estilo

### 📝 `types/`

Definiciones de tipos (TypeScript):

- Interfaces y tipos compartidos
- Útil para migración a TypeScript

### 🛠️ `utils/`

Funciones de utilidad y helpers:

- **helpers.js**: Funciones puras reutilizables
- Validaciones, formateo, etc.

## 🚀 Ventajas de esta Estructura

### ✅ **Escalabilidad**

- Fácil agregar nuevas funcionalidades
- Código organizado por responsabilidad
- Separación clara de concerns

### ✅ **Mantenibilidad**

- Fácil localizar y modificar código
- Reutilización de componentes
- Consistencia en el proyecto

### ✅ **Colaboración**

- Estructura clara para equipos
- Convenciones establecidas
- Fácil onboarding de desarrolladores

### ✅ **Testing**

- Componentes aislados y testeable
- Separación de lógica de negocio
- Mocking sencillo de servicios

## 📖 Cómo Usar

### 1. **Crear Componentes**

```javascript
// src/components/common/NewComponent.js
import React from "react";
import { View } from "react-native";

const NewComponent = () => {
  return <View>...</View>;
};

export default NewComponent;
```

### 2. **Agregar Pantallas**

```javascript
// src/screens/NewScreen.js
import React from "react";
import { View } from "react-native";

const NewScreen = () => {
  return <View>...</View>;
};

export default NewScreen;
```

### 3. **Usar Constantes**

```javascript
import { COLORS, SIZES } from "../constants/theme";
```

### 4. **Crear Custom Hooks**

```javascript
// src/hooks/useCustomHook.js
import { useState, useEffect } from "react";

export const useCustomHook = () => {
  // lógica del hook
  return { data, loading };
};
```

## 🔧 Próximos Pasos

1. **Configurar navegación** con React Navigation
2. **Agregar gestión de estado** (Redux/Zustand)
3. **Implementar autenticación** completa
4. **Agregar tests** unitarios e integración
5. **Configurar CI/CD** para deployment

Esta estructura te proporcionará una base sólida para desarrollar aplicaciones React Native escalables y mantenibles.
