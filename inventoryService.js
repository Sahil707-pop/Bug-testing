function updateInventory(inventory, productId, quantity) {
  const product = inventory.find(item => item.id === productId);

  if (!product) {
    return { success: false, message: "Product not found" };
  }

  const remainingStock = product.stock - quantity;

  if (remainingStock < 0) {
    return { success: false, message: "Insufficient stock" };
  }

  product.stock = remainingStock;

  return {
    success: true,
    productId: product.id,
    remainingStock: product.stock
  };
}

const inventory = [
  { id: 101, name: "Laptop", stock: 5 },
  { id: 102, name: "Keyboard", stock: 10 }
];

console.log(updateInventory(inventory, 101, 8));