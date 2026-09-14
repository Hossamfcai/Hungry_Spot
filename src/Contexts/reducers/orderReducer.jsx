export const initialOrders = {
  orders: [],
  loadingOrders: false,
  ordersError: { isError: false, message: "" },
};

export function ordresReducer(ordersState, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...ordersState,
        loadingOrders: true,
        ordersError: { isError: false, message: "" },
      };

    case "SET_ERROR":
      return {
        ...ordersState,
        loadingOrders: false,
        ordersError: {
          isError: true,
          message: action.payload || "An orders Error occurred",
        },
      };

    case "GET_ORDERS_SUCCESS":
      return {
        ...ordersState,
        orders: [...action.payload],
        loadingOrders: false,
        ordersError: { isError: false, message: "" },
      };

    case "UPDATE_ORDER_STATUS_SUCCESS":
      return {
        ...ordersState,
        orders: ordersState.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order,
        ),
        ordersError: { isError: false, message: "" },
      };

    case "ADD_ORDER_SUCCESS": {
      return {
        ...ordersState,
        orders: [...ordersState.orders, action.payload],
        loadingOrders: false,
        ordersError: { isError: false, message: "" },
      };
    }

    case "GET_USER_ORDER_SUCCESS": {
      return {
        ...ordersState,
        orders: [...action.payload],
        loadingOrders: false,
        ordersError: { isError: false, message: "" },
      };
    }

    default:
      return ordersState;
  }
}
