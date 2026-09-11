import { useCallback } from "react";
import { getMenuService } from "../Services/menuServices";

export function useMenuActions(dispatch) {
  const getMenuData = useCallback(async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      // Fetch user using saved auth token
      const response = await getMenuService();
      dispatch({ type: "GET_MENU_SUCCESS", payload: response });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to fetch Menu",
      });
    }
  }, [dispatch]);

  // Return the actions so components can use them
  return {
    getMenuData,
  };
}
