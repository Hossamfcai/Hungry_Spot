import { useCallback } from "react";
import {
  getUserService,
  loginService,
  signUpService,
} from "../Services/authServices";

export function useAuthActions(dispatch) {
  const handleLogin = useCallback(
    async (body) => {
      if (!dispatch) return;
      dispatch({ type: "SET_LOADING" });
      try {
        const response = await loginService(body);
        dispatch({ type: "LOGIN_SUCCESS", payload: response });
        return response;
      } catch (err) {
        console.log();
        const errorMessage =
          err.status == 401
            ? "Invalid email or password."
            : err.message == "Network Error"
              ? "Unable to connect to the server now try again later or check your network"
              : "";
        dispatch({
          type: "SET_ERROR",
          payload: errorMessage,
        });
        throw err instanceof Error ? err : new Error(errorMessage);
      }
    },
    [dispatch],
  );

  const handleSignUp = useCallback(
    async (body) => {
      if (!dispatch) return;
      dispatch({ type: "SET_LOADING" });
      try {
        const response = await signUpService(body);
        dispatch({ type: "LOGIN_SUCCESS", payload: response });
        return response;
      } catch (err) {
        console.log();
        const errorMessage =
          err.status == 409
            ? "An account with this email already exists."
            : err.message == "Network Error"
              ? "Unable to connect to the server now try again later or check your network"
              : "";
        dispatch({
          type: "SET_ERROR",
          payload: errorMessage,
        });
        throw err instanceof Error ? err : new Error(errorMessage);
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
    handleSignUp,
  };
}
