import { useEffect } from "react";
import {
  useMenuDispatch,
  useMenuState,
  useOrdersDispatch,
  useOrdersState,
  useAuthDispatch,
  useAuthState,
  useUsersState,
  useUsersDispatch,
} from "../../Contexts/AppContext";

export default function Statistics() {
  const { auth, loading, error } = useAuthState();
  const { users, loadingUsersData, usersDataError } = useUsersState();
  const { getAllUsersData } = useUsersDispatch();
  const { getUserData } = useAuthDispatch();
  const { menu, loadingMenu, menuError } = useMenuState();
  const { getMenuData } = useMenuDispatch();
  const { orders, loadingOrders, ordersError } = useOrdersState();
  const { getOrdersData } = useOrdersDispatch();
  useEffect(() => {
    getUserData();
    getMenuData();
    getOrdersData();
    getAllUsersData();
  }, []);

  // Log state updates on every re-render
  // console.log("Current auth state in render:", auth);
  // console.log("Current menu state in render:", menu);
  // console.log("Current orders state in render:", orders);
  // console.log("Current users state in render:", users);

  if (loading) return <div>Loading auth data...</div>;
  if (error.isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>
        <strong>Name:</strong> {auth.name || "N/A"}
      </p>
      <p>
        <strong>Email:</strong> {auth.email || "N/A"}
      </p>
      <p>
        <strong>Role:</strong> {auth.role || "N/A"}
      </p>
    </div>
  );
}
