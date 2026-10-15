function updateInventory(inventory, productId, quantity) {
  // Validate quantity is a non-negative finite number
  if (typeof quantity !== 'number' || !isFinite(quantity) || quantity < 0) {
    return { success: false, message: 'Invalid quantity' };
  }

  // Shallow copy inventory to avoid mutating the original array/objects
  const inv = inventory.map(item => ({ ...item }));
  const product = inv.find(item => item.id === productId);

  if (!product) {
    return { success: false, message: 'Product not found' };
  }

  product.stock = product.stock - quantity;

  if (product.stock < 0) {
    return { success: false, message: 'Insufficient stock' };
  }

  return {
    success: true,
    productId: product.id,
    remainingStock: product.stock
  };
}

const inventory = [
  { id: 101, name: 'Laptop', stock: 5 },
  { id: 102, name: 'Keyboard', stock: 10 }
];

console.log(updateInventory(inventory, 101, 8));