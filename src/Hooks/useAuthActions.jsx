import { useCallback } from "react";
import { getUserService, loginService } from "../Services/authServices";

export function useAuthActions(dispatch) {
  const handleLogin = useCallback(
    async (body) => {
      if (!dispatch) return;
      dispatch({ type: "SET_LOADING" });
      try {
        const response = await loginService(body);
        dispatch({ type: "LOGIN_SUCCESS", payload: response });
      } catch (err) {
        dispatch({
          type: "SET_ERROR",
          payload: err.message || "Error fetching products",
        });
      }
    },
    [dispatch],
  );

  const getUserData = useCallback(async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await getUserService();
      dispatch({ type: "GET_USER_SUCCESS", payload: response });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err.response?.data?.message || "Failed to fetch user data",
      });
    }
  }, [dispatch]);

  // Return the actions so components can use them
  return {
    handleLogin,
    getUserData,
  };
}
