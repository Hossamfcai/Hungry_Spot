import { useCallback } from "react";
import {
  getOrdersService,
  updateOrderStatusService,
} from "../Services/ordersServices";

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

  const updateOrderStatus = useCallback(
    async (orderId, status) => {
      try {
        const response = await updateOrderStatusService(orderId, status);

        dispatch({
          type: "UPDATE_ORDER_STATUS_SUCCESS",
          payload: response,
        });
      } catch (err) {
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to update Order status",
        });
      }
    },
    [dispatch],
  );

  return {
    getOrdersData,
    updateOrderStatus,
  };
}
