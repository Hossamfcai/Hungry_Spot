import { useCallback } from "react";

import {
  getMenuService,
  addMenuService,
  updateMenuService,
  updateMenuAvailabilityService,
  searchMenuService,
  deleteMenuService,
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
  // Add Product
  // =========================

  const addMenuData = useCallback(
    async (productData) => {
      dispatch({
        type: "ADD_MENU_LOADING",
      });

      try {
        const response = await addMenuService(productData);

        dispatch({
          type: "ADD_MENU_SUCCESS",
          payload: response,
        });

        return {
          success: true,
          data: response,
        };
      } catch (err) {
        const message =
          err.response?.data?.message || err.message || "Failed to add product";

        dispatch({
          type: "ADD_MENU_ERROR",
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
  // Delete Product
  // =========================
  const deleteMenuData = useCallback(
    async (id) => {
      dispatch({
        type: "DELETE_MENU_LOADING",
      });

      try {
        await deleteMenuService(id);

        dispatch({
          type: "DELETE_MENU_SUCCESS",
          payload: id,
        });

        return {
          success: true,
        };
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.message ||
          "Failed to delete product";

        dispatch({
          type: "DELETE_MENU_ERROR",
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

  const getSearchMenuData = useCallback(
    async (search, category) => {
      dispatch({ type: "SET_LOADING" });
      try {
        const response = await searchMenuService(search, category);
        dispatch({
          type: "GET_SEARCH_MENU_SUCCESS",
          payload: response,
        });
      } catch (err) {
        const message =
          err.response?.data?.message || err.message || "Failed to filter";
        dispatch({
          type: "SET_ERROR",
          payload: message,
        });
      }
    },
    [dispatch],
  );

  // =========================
  // Return Actions
  // =========================
  return {
    getMenuData,
    addMenuData,
    updateMenuData,
    toggleMenuAvailability,
    getSearchMenuData,
    deleteMenuData,
  };
}
