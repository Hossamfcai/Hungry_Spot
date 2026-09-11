import { useCallback } from "react";
import { getAllUsersService } from "../Services/usersServices";

export function useUsersActions(dispatch) {
  const getAllUsersData = useCallback(async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await getAllUsersService();
      dispatch({ type: "GET_ALL_USER_SUCCESS", payload: response });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to fetch Users",
      });
    }
  }, [dispatch]);
  return {
    getAllUsersData,
  };
}
