export const getTopProductsByRevenue = (orders = [], limit = 3) => {
  const productMap = {};

  orders.forEach((order) => {
    // Filter for completed status only
    if (
      order.status?.toLowerCase() !== "completed" ||
      !Array.isArray(order.items)
    ) {
      return;
    }

    order.items.forEach((item) => {
      // Use product ID or name as unique key
      const key = item.id || item.productId || item.title || item.name;
      const name = item.title || item.name || "Unknown Product";
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      const itemRevenue = price * quantity;

      if (!productMap[key]) {
        productMap[key] = {
          id: key,
          name: name,
          totalRevenue: 0,
          totalQuantity: 0,
        };
      }

      productMap[key].totalRevenue += itemRevenue;
      productMap[key].totalQuantity += quantity;
    });
  });

  // Convert map to array, sort descending by revenue, and slice top N
  return Object.values(productMap)
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, limit)
    .map((prod) => ({
      ...prod,
      totalRevenue: Number(prod.totalRevenue.toFixed(2)),
    }));
};
