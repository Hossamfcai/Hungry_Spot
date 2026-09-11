export const initialAuth = {
  auth: {
    id: "",
    name: "",
    email: "",
    role: "",
    createdAt: "",
  },
  loading: false,
  error: { isError: false, message: "" },
};

export function authReducer(authState, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...authState,
        loading: true,
        error: { isError: false, message: "" }, // Reset errors on new request
      };

    case "SET_ERROR":
      return {
        ...authState,
        loading: false,
        error: {
          isError: true,
          message: action.payload || "An error occurred", // Dynamic error message
        },
      };

    case "LOGIN_SUCCESS":
      return {
        ...authState,
        auth: action.payload,
        loading: false,
        error: { isError: false, message: "" }, // Clear errors on success
      };
    case "GET_USER_SUCCESS":
      return {
        ...authState,
        auth: action.payload,
        loading: false,
        error: { isError: false, message: "" }, // Clear errors on success
      };

    default:
      return authState;
  }
}
