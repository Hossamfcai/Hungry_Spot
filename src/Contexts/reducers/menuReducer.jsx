export const initialMenu = {
  menu: [],
  searchInMenu: [],
  categories: [],
  loadingMenu: false,

  menuError: {
    isError: false,
    message: "",
  },

  // Add
  addingMenu: false,

  addMenuError: {
    isError: false,
    message: "",
  },

  // Edit loading
  updatingMenu: false,

  // Availability loading
  updatingAvailability: false,

  updateMenuError: {
    isError: false,
    message: "",
  },

  availabilityError: {
    isError: false,
    message: "",
  },
};

export function menuReducer(menuState, action) {
  switch (action.type) {
    // =====================================================
    // GET LOADING
    // =====================================================

    case "SET_LOADING":
      return {
        ...menuState,

        loadingMenu: true,

        menuError: {
          isError: false,
          message: "",
        },
      };

    // =====================================================
    // GET ERROR
    // =====================================================

    case "SET_ERROR":
      return {
        ...menuState,

        loadingMenu: false,

        menuError: {
          isError: true,
          message: action.payload || "An error occurred while loading menu",
        },
      };

    // =====================================================
    // GET SUCCESS
    // =====================================================

    case "GET_MENU_SUCCESS": {
      return {
        ...menuState,
        menu: [...action.payload],
        loadingMenu: false,
        menuError: {
          isError: false,
          message: "",
        },
      };
    }

    case "GET_SEARCH_MENU_SUCCESS":
      return {
        ...menuState,
        searchInMenu: [...action.payload],
        loadingMenu: false,
        menuError: {
          isError: false,
          message: "",
        },
      };

    // =====================================================
    // ADD PRODUCT LOADING
    // =====================================================

    case "ADD_MENU_LOADING":
      return {
        ...menuState,

        addingMenu: true,

        addMenuError: {
          isError: false,
          message: "",
        },
      };

    // =====================================================
    // ADD PRODUCT SUCCESS
    // =====================================================

    case "ADD_MENU_SUCCESS":
      return {
        ...menuState,

        menu: [...menuState.menu, action.payload],

        addingMenu: false,

        addMenuError: {
          isError: false,
          message: "",
        },
      };

    // =====================================================
    // ADD PRODUCT ERROR
    // =====================================================

    case "ADD_MENU_ERROR":
      return {
        ...menuState,

        addingMenu: false,

        addMenuError: {
          isError: true,
          message: action.payload || "Failed to add menu item",
        },
      };

    // =====================================================
    // UPDATE PRODUCT LOADING
    // =====================================================

    case "UPDATE_MENU_LOADING":
      return {
        ...menuState,

        updatingMenu: true,

        updateMenuError: {
          isError: false,
          message: "",
        },
      };

    // =====================================================
    // UPDATE PRODUCT SUCCESS
    // =====================================================

    case "UPDATE_MENU_SUCCESS":
      return {
        ...menuState,

        menu: menuState.menu.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        ),

        updatingMenu: false,

        updateMenuError: {
          isError: false,
          message: "",
        },
      };

    // =====================================================
    // UPDATE PRODUCT ERROR
    // =====================================================

    case "UPDATE_MENU_ERROR":
      return {
        ...menuState,

        updatingMenu: false,

        updateMenuError: {
          isError: true,
          message: action.payload || "Failed to update menu item",
        },
      };

    // =====================================================
    // AVAILABILITY LOADING
    // =====================================================

    case "UPDATE_AVAILABILITY_LOADING":
      return {
        ...menuState,

        updatingAvailability: true,

        availabilityError: {
          isError: false,
          message: "",
        },
      };

    // =====================================================
    // AVAILABILITY SUCCESS
    // =====================================================

    case "UPDATE_AVAILABILITY_SUCCESS":
      return {
        ...menuState,

        menu: menuState.menu.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        ),

        updatingAvailability: false,

        availabilityError: {
          isError: false,
          message: "",
        },
      };

    // =====================================================
    // AVAILABILITY ERROR
    // =====================================================

    case "UPDATE_AVAILABILITY_ERROR":
      return {
        ...menuState,

        updatingAvailability: false,

        availabilityError: {
          isError: true,
          message: action.payload || "Failed to update availability",
        },
      };

    default:
      return menuState;
  }
}
