import { useCallback } from "react";
import { getOrdersService } from "../Services/ordersServices";

export function useOrdersActions(dispatch) {
  const getOrdersData = useCallback(async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await getOrdersService();
      dispatch({ type: "GET_ORDERS_SUCCESS", payload: response });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to fetch Orders",
      });
    }
  }, [dispatch]);
  return {
    getOrdersData,
  };
}
