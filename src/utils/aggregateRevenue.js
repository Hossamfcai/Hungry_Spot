export const getMonthlyRevenue = (orders = []) => {
  const monthlyMap = {};

  orders.forEach((order) => {
    // Process completed orders only
    if (order.status?.toLowerCase() !== "completed" || !order.createdAt) return;

    const date = new Date(order.createdAt);
    // Format label (e.g., "Jan 2026")
    const monthKey = date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    const orderTotal = (order.items || []).reduce((sum, item) => {
      return sum + (Number(item.price) || 0) * (Number(item.quantity) || 0);
    }, 0);

    monthlyMap[monthKey] = (monthlyMap[monthKey] || 0) + orderTotal;
  });

  return Object.entries(monthlyMap).map(([month, revenue]) => ({
    month,
    revenue: Number(revenue.toFixed(2)),
  }));
};
