import { useCallback } from "react";

import {
  getMenuService,
  updateMenuService,
  updateMenuAvailabilityService,
} from "../Services/menuServices";

export function useMenuActions(dispatch) {
  // =========================
  // Get Menu
  // =========================
  const getMenuData = useCallback(async () => {
    dispatch({ type: "SET_LOADING" });

    try {
      const response = await getMenuService();

      dispatch({
        type: "GET_MENU_SUCCESS",
        payload: response,
      });

      return {
        success: true,
        data: response,
      };
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to fetch Menu";

      dispatch({
        type: "SET_ERROR",
        payload: message,
      });

      return {
        success: false,
        message,
      };
    }
  }, [dispatch]);

  // =========================
  // Update Product
  // =========================
  const updateMenuData = useCallback(
    async (id, productData) => {
      dispatch({
        type: "UPDATE_MENU_LOADING",
      });

      try {
        const response = await updateMenuService(id, productData);

        dispatch({
          type: "UPDATE_MENU_SUCCESS",
          payload: response,
        });

        return {
          success: true,
          data: response,
        };
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.message ||
          "Failed to update product";

        dispatch({
          type: "UPDATE_MENU_ERROR",
          payload: message,
        });

        return {
          success: false,
          message,
        };
      }
    },
    [dispatch],
  );

  // =========================
  // Toggle Active / Inactive
  // =========================
  const toggleMenuAvailability = useCallback(
    async (id, available) => {
      dispatch({
        type: "UPDATE_AVAILABILITY_LOADING",
      });

      try {
        const response = await updateMenuAvailabilityService(id, available);

        dispatch({
          type: "UPDATE_AVAILABILITY_SUCCESS",
          payload: response,
        });

        return {
          success: true,
          data: response,
        };
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.message ||
          "Failed to update availability";

        dispatch({
          type: "UPDATE_AVAILABILITY_ERROR",
          payload: message,
        });

        return {
          success: false,
          message,
        };
      }
    },
    [dispatch],
  );

  // =========================
  // Return Actions
  // =========================
  return {
    getMenuData,
    updateMenuData,
    toggleMenuAvailability,
  };
}
