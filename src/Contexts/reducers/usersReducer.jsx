export const initialUsersData = {
  users: [],
  loadingUsersData: false,
  usersDataError: { isError: false, message: "" },
};

export function usersReducer(usersState, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...usersState,
        loadingUsersData: true,
        usersDataError: { isError: false, message: "" },
      };

    case "SET_ERROR":
      return {
        ...usersState,
        loadingUsersData: false,
        usersDataError: {
          isError: true,
          message: action.payload || "An Error occurred of user services",
        },
      };

    case "GET_ALL_USER_SUCCESS":
      return {
        ...usersState,
        users: [...action.payload],
        loadingUsersData: false,
        usersDataError: { isError: false, message: "" },
      };

    default:
      return usersState;
  }
}
