import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignora estas rutas para verificación de serialización
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});
