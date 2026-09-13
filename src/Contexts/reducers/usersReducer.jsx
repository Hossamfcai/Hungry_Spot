export const initialUsersData = {
  users: [],
  loadingUsersData: false,
  actionLoading: false,
  usersDataError: {
    isError: false,
    message: "",
  },
};

export function usersReducer(usersState, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...usersState,
        loadingUsersData: true,
        usersDataError: {
          isError: false,
          message: "",
        },
      };

    case "SET_ACTION_LOADING":
      return {
        ...usersState,
        actionLoading: true,
        usersDataError: {
          isError: false,
          message: "",
        },
      };

    case "SET_ACTION_FINISHED":
      return {
        ...usersState,
        actionLoading: false,
      };

    case "SET_ERROR":
      return {
        ...usersState,
        loadingUsersData: false,
        actionLoading: false,
        usersDataError: {
          isError: true,
          message:
            action.payload || "An error occurred in user services.",
        },
      };

    case "GET_ALL_USER_SUCCESS":
      return {
        ...usersState,
        users: [...action.payload],
        loadingUsersData: false,
        usersDataError: {
          isError: false,
          message: "",
        },
      };

    case "ADD_USER_SUCCESS":
      return {
        ...usersState,
        users: [...usersState.users, action.payload],
        actionLoading: false,
        usersDataError: {
          isError: false,
          message: "",
        },
      };

    default:
      return usersState;
  }
}