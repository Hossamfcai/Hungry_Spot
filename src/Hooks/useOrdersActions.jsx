import { useCallback } from "react";
import {
  addOrderServices,
  getOrdersService,
  getUserOrderService,
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

  const addOrderAction = useCallback(
    async (body) => {
      dispatch({ type: "SET_LOADING" });
      try {
        const response = await addOrderServices(body);
        dispatch({
          type: "ADD_ORDER_SUCCESS",
          payload: response,
        });
        return response;
      } catch (err) {
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to update Order status",
        });
      }
    },
    [dispatch],
  );
  const getUserOrdersData = useCallback(async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await getUserOrderService();
      dispatch({ type: "GET_USER_ORDER_SUCCESS", payload: response });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to fetch Orders",
      });
    }
  }, [dispatch]);
  return {
    getOrdersData,
    updateOrderStatus,
    addOrderAction,
    getUserOrdersData,
  };
}
