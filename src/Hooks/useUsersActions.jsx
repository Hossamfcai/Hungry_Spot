import { useCallback } from "react";
import {
  createUserService,
  getAllUsersService,
} from "../Services/usersServices";

export function useUsersActions(dispatch) {
  const getAllUsersData = useCallback(async () => {
    dispatch({ type: "SET_LOADING" });

    try {
      const response = await getAllUsersService();

      dispatch({
        type: "GET_ALL_USER_SUCCESS",
        payload: response,
      });

      return response;
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch users.",
      });

      throw err;
    }
  }, [dispatch]);

  const addUserData = useCallback(
    async (body) => {
      dispatch({ type: "SET_ACTION_LOADING" });

      try {
        const user = await createUserService(body);

        dispatch({
          type: "ADD_USER_SUCCESS",
          payload: user,
        });

        return user;
      } catch (err) {
        dispatch({
          type: "SET_ERROR",
          payload:
            err?.response?.data?.message ||
            err?.message ||
            "Failed to create user.",
        });

        throw err;
      } finally {
        dispatch({ type: "SET_ACTION_FINISHED" });
      }
    },
    [dispatch],
  );

  return {
    getAllUsersData,
    addUserData,
  };
}
