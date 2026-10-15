function calculatePayment(items, discountPercentage, taxPercentage) {
    let subtotal = 0;

    for (const item of items) {
        subtotal += item.price * item.quantity;
    }

    const discount = subtotal * discountPercentage;

    const discountedTotal = subtotal - discount;

    const tax = subtotal * (taxPercentage / 100);

    const finalTotal = discountedTotal + tax;

    return {
        subtotal,
        discount,
        tax,
        total: finalTotal
    };
}

const items = [
    { name: "Laptop", price: 1000, quantity: 1 },
    { name: "Mouse", price: 50, quantity: 2 }
];

console.log(calculatePayment(items, 10, 18));
