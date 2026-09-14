import { createContext, useContext } from "react";

const ListedOrderContext = createContext(null);

export default function ListedOrderProvider({ children, value }) {
  return (
    <ListedOrderContext.Provider value={value}>
      {children}
    </ListedOrderContext.Provider>
  );
}

export function useOrderList() {
  const context = useContext(ListedOrderContext);
  if (!context) {
    throw new Error("useOrderList must be used within an ListedOrderProvider");
  }
  return context;
}
