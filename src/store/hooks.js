import { useDispatch, useSelector } from "react-redux";

// Hook personalizado para el dispatch
export const useAppDispatch = () => useDispatch();

// Hook personalizado para el selector
export const useAppSelector = (selector) => useSelector(selector);

// Hooks específicos para auth
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  return {
    ...auth,
    dispatch,
  };
};
