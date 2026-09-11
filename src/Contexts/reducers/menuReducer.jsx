export const initialMenu = {
  menu: [],
  loadingMenu: false,
  menuError: { isError: false, message: "" },
};

export function menuReducer(menuState, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...menuState,
        loadingMenu: true,
        menuError: { isError: false, message: "" },
      };

    case "SET_ERROR":
      return {
        ...menuState,
        loadingMenu: false,
        menuError: {
          isError: true,
          message: action.payload || "An menuError occurred",
        },
      };

    case "GET_MENU_SUCCESS":
      return {
        ...menuState,
        menu: [...action.payload],
        loadingMenu: false,
        menuError: { isError: false, message: "" },
      };

    default:
      return menuState;
  }
}
