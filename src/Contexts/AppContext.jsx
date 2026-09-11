import { createContext, useContext, useReducer } from "react";
import { initialAuth, authReducer } from "./reducers/authReducer";
import { useAuthActions } from "../Hooks/useAuthActions";
import { initialMenu, menuReducer } from "./reducers/menuReducer";
import { useMenuActions } from "../Hooks/useMenuActions";
import { initialOrders, ordresReducer } from "./reducers/orderReducer";
import { useOrdersActions } from "../Hooks/useOrdersActions";
import { initialUsersData, usersReducer } from "./reducers/usersReducer";
import { useUsersActions } from "../Hooks/useUsersActions";

const AuthStateContext = createContext(undefined);
const AuthDispatchContext = createContext(undefined);

const UsersStateContext = createContext(undefined);
const UsersDispatchContext = createContext(undefined);

const MenuStateContext = createContext(undefined);
const MenuDispatchContext = createContext(undefined);

const OrdersStateContext = createContext(undefined);
const OrdersDispatchContext = createContext(undefined);

export const AppContext = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuth);
  const [userState, userDispatch] = useReducer(usersReducer, initialUsersData);
  const [menuState, menuDispatch] = useReducer(menuReducer, initialMenu);
  const [ordersState, ordersDispatch] = useReducer(
    ordresReducer,
    initialOrders,
  );

  return (
    <UsersStateContext value={userState}>
      <UsersDispatchContext value={userDispatch}>
        <OrdersStateContext value={ordersState}>
          <OrdersDispatchContext value={ordersDispatch}>
            <MenuStateContext value={menuState}>
              <MenuDispatchContext value={menuDispatch}>
                <AuthStateContext.Provider value={authState}>
                  <AuthDispatchContext.Provider value={authDispatch}>
                    {children}
                  </AuthDispatchContext.Provider>
                </AuthStateContext.Provider>
              </MenuDispatchContext>
            </MenuStateContext>
          </OrdersDispatchContext>
        </OrdersStateContext>
      </UsersDispatchContext>
    </UsersStateContext>
  );
};

////////////// AUTH HOOKS////////////////
// Hook for reading state (triggers re-renders on state changes)
export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a Provider");
  }
  return context;
};

// Hook for actions only (STABLE: never triggers re-renders when state updates)
export const useAuthDispatch = () => {
  const dispatch = useContext(AuthDispatchContext);
  if (dispatch === undefined) {
    throw new Error(
      "AuthDispatchContext must be used within a ProductProvider",
    );
  }
  return useAuthActions(dispatch);
};
////////////// AUTH HOOKS////////////////

////////////// USERS HOOKS////////////////

export const useUsersState = () => {
  const context = useContext(UsersStateContext);
  if (context === undefined) {
    throw new Error("UsersStateContext must be used within a Provider");
  }
  return context;
};

export const useUsersDispatch = () => {
  const dispatch = useContext(UsersDispatchContext);
  if (dispatch === undefined) {
    throw new Error(
      "UsersDispatchContext must be used within a ProductProvider",
    );
  }
  return useUsersActions(dispatch);
};
////////////// USERS HOOKS////////////////

////////////// MENU HOOKS////////////////
export const useMenuState = () => {
  const context = useContext(MenuStateContext);
  if (context === undefined) {
    throw new Error("useMenuState must be used within a Provider");
  }
  return context;
};

export const useMenuDispatch = () => {
  const dispatch = useContext(MenuDispatchContext);
  if (dispatch === undefined) {
    throw new Error("useMenuDispatch must be used within a ProductProvider");
  }
  return useMenuActions(dispatch);
};
////////////// MENU HOOKS////////////////

////////////// ORDERS HOOKS////////////////
export const useOrdersState = () => {
  const context = useContext(OrdersStateContext);
  if (context === undefined) {
    throw new Error("useOrdersState must be used within a Provider");
  }
  return context;
};

export const useOrdersDispatch = () => {
  const dispatch = useContext(OrdersDispatchContext);
  if (dispatch === undefined) {
    throw new Error("useOrdersDispatch must be used within a ProductProvider");
  }
  return useOrdersActions(dispatch);
};
////////////// ORDERS HOOKS////////////////
