use std::collections::HashMap;

#[derive(Debug, Clone)]
struct Order {
    id: u64,
    customer_id: u64,
    total: f64,
    status: String,
}

struct OrderService {
    orders: HashMap<u64, Order>,
}

impl OrderService {
    fn new() -> Self {
        Self {
            orders: HashMap::new(),
        }
    }

    fn create_order(&mut self, customer_id: u64, total: f64) -> u64 {
        let id = self.orders.len() as u64 + 1;

        let order = Order {
            id,
            customer_id,
            total,
            status: "pending".to_string(),
        };

        self.orders.insert(id, order);
        id
    }

    fn mark_paid(&mut self, order_id: u64) -> Result<(), String> {
        let order = self
            .orders
            .get_mut(&order_id)
            .ok_or_else(|| format!("Order {} not found", order_id))?;

        if order.status != "pending" {
            return Err(format!(
                "Order {} cannot be paid because it is already {}",
                order.id, order.status
            ));
        }

        order.status = "paid".to_string();
        Ok(())
    }

    fn refund(&mut self, order_id: u64) -> Result<f64, String> {
        let order = self
            .orders
            .get_mut(&order_id)
            .ok_or_else(|| format!("Order {} not found", order_id))?;

        if order.status != "paid" {
            return Err(format!(
                "Order {} cannot be refunded",
                order.id
            ));
        }

        order.status = "refunded".to_string();

        Ok(order.total)
    }

    fn customer_orders(&self, customer_id: u64) -> Vec<&Order> {
        self.orders
            .values()
            .filter(|order| order.customer_id == customer_id)
            .collect()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn creates_and_pays_order() {
        let mut service = OrderService::new();

        let id = service.create_order(42, 1499.0);

        assert!(service.mark_paid(id).is_ok());
    }

    #[test]
    fn cannot_refund_unpaid_order() {
        let mut service = OrderService::new();

        let id = service.create_order(42, 1499.0);

        assert!(service.refund(id).is_err());
    }

    #[test]
    fn refunds_paid_order_and_returns_amount() {
        let mut service = OrderService::new();

        let id = service.create_order(42, 1499.0);
        service.mark_paid(id).unwrap();

        let refunded_amount = service.refund(id).unwrap();

        assert_eq!(refunded_amount, 1499.0);
    }

    #[test]
    fn customer_orders_returns_only_matching_orders() {
        let mut service = OrderService::new();

        service.create_order(42, 100.0);
        service.create_order(99, 200.0);
        service.create_order(42, 300.0);

        let orders = service.customer_orders(42);

        assert_eq!(orders.len(), 2);
    }
}
