package com.PinoyHeritage.Backend.controller;

import com.PinoyHeritage.Backend.entity.CartItem;
import com.PinoyHeritage.Backend.entity.Customer;
import com.PinoyHeritage.Backend.entity.Order;
import com.PinoyHeritage.Backend.entity.ProductOrder;
import com.PinoyHeritage.Backend.entity.Product;
import com.PinoyHeritage.Backend.entity.Payment;
import com.PinoyHeritage.Backend.repository.OrderRepository;
import com.PinoyHeritage.Backend.repository.ProductRepository;
import com.PinoyHeritage.Backend.repository.CustomerRepository;
import com.PinoyHeritage.Backend.repository.PaymentRepository;
import com.PinoyHeritage.Backend.service.CartService;
import com.PinoyHeritage.Backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private PaymentRepository paymentRepository;

    // Get all orders (for dashboard count)
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/customer/{customerId}")
    public List<OrderHistoryItem> getOrdersForCustomer(@PathVariable Long customerId) {
        List<Order> orders = orderRepository.findByCustomerId(customerId);
        List<OrderHistoryItem> result = new ArrayList<>();

        for (Order order : orders) {
            OrderHistoryItem item = new OrderHistoryItem();
            item.setOrderId(order.getId());
            item.setTotalAmount(order.getTotalAmount());
            item.setStatus(order.getStatus());

            List<ProductLine> products = new ArrayList<>();
            if (order.getProducts() != null) {
                for (ProductOrder po : order.getProducts()) {
                    ProductLine line = new ProductLine();
                    line.setProductId(po.getProduct().getId());
                    line.setProductName(po.getProduct().getName());
                    line.setQuantity(po.getQuantity());
                    products.add(line);
                }
            }
            item.setProducts(products);

            result.add(item);
        }

        return result;
    }

    // Create an order from the current cart items for a customer
    @PostMapping("/customer/{customerId}/from-cart")
    public Order createOrderFromCart(
            @PathVariable Long customerId,
            @RequestBody(required = false) PaymentRequest paymentRequest) {
        
        List<CartItem> cartItems = cartService.getCartItems(customerId);
        if (cartItems == null || cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty; cannot create order.");
        }

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Order order = new Order();
        order.setCustomer(customer);
        order.setStatus("Pending");

        // Build ProductOrder list and total
        List<ProductOrder> productOrders = new ArrayList<>();
        double total = 0.0;

        for (CartItem ci : cartItems) {
            ProductOrder po = new ProductOrder();
            po.setOrder(order);
            po.setQuantity(ci.getQuantity());

            // Try to resolve Product by name (best-effort)
            Product product = productRepository.findByName(ci.getProductName())
                    .orElse(null);
            po.setProduct(product);

            // Reduce product stock/inventory
            if (product != null && product.getStock() != null && ci.getQuantity() != null) {
                int newStock = product.getStock() - ci.getQuantity();
                product.setStock(Math.max(0, newStock)); // Don't go below 0
                productRepository.save(product);
            }

            productOrders.add(po);

            total += (ci.getAmount() != null ? ci.getAmount() : 0.0);
        }

        order.setProducts(productOrders);
        order.setTotalAmount(total);

        // Save order (cascades to ProductOrder)
        Order saved = orderRepository.save(order);

        // Create and save Payment record
        Payment payment = new Payment();
        payment.setOrder(saved);
        payment.setMethod(paymentRequest != null && paymentRequest.getMethod() != null 
                ? paymentRequest.getMethod() : "Unknown");
        payment.setStatus("Completed");
        paymentRepository.save(payment);

        // Clear the customer's cart
        cartService.clearCart(customerId);

        // Create notification for the customer
        notificationService.createNotification(
                customerId,
                saved.getId(),
                "Your order #" + saved.getId() + " has been placed. Payment: " + payment.getMethod()
        );

        return saved;
    }

    // DTO for payment request
    public static class PaymentRequest {
        private String method;

        public String getMethod() { return method; }
        public void setMethod(String method) { this.method = method; }
    }

    // Admin: list all orders with summary details
    @GetMapping("/admin")
    public List<AdminOrderItem> getAllOrdersForAdmin() {
        List<Order> orders = orderRepository.findAll();
        List<AdminOrderItem> result = new ArrayList<>();

        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("MM/dd/yy HH:mm");

        for (Order order : orders) {
            AdminOrderItem item = new AdminOrderItem();
            item.setId(order.getId());
            item.setTotalAmount(order.getTotalAmount());
            item.setStatus(order.getStatus());

            if (order.getCreatedAt() != null) {
                item.setCreatedAt(order.getCreatedAt().format(fmt));
            }

            if (order.getCustomer() != null) {
                String name = order.getCustomer().getFirstName();
                if (order.getCustomer().getLastName() != null) {
                    name = name + " " + order.getCustomer().getLastName();
                }
                item.setCustomerName(name);
            }

            int itemsCount = 0;
            if (order.getProducts() != null) {
                for (ProductOrder po : order.getProducts()) {
                    if (po.getQuantity() != null) {
                        itemsCount += po.getQuantity();
                    }
                }
            }
            item.setItemsCount(itemsCount);

            result.add(item);
        }

        return result;
    }

    // Admin: update order status and notify customer
    @PutMapping("/{orderId}/status")
    public void updateOrderStatus(@PathVariable Long orderId, @RequestBody StatusUpdateRequest request) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(request.getStatus());
        orderRepository.save(order);

        if (order.getCustomer() != null) {
            Long customerId = order.getCustomer().getId();
            String message = "Your order #" + order.getId() + " status updated to " + request.getStatus();
            notificationService.createNotification(customerId, order.getId(), message);
        }
    }

    public static class OrderHistoryItem {
        private Long orderId;
        private Double totalAmount;
        private String status;
        private List<ProductLine> products;

        public Long getOrderId() { return orderId; }
        public void setOrderId(Long orderId) { this.orderId = orderId; }

        public Double getTotalAmount() { return totalAmount; }
        public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public List<ProductLine> getProducts() { return products; }
        public void setProducts(List<ProductLine> products) { this.products = products; }
    }

    public static class ProductLine {
        private Long productId;
        private String productName;
        private Integer quantity;

        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }

        public String getProductName() { return productName; }
        public void setProductName(String productName) { this.productName = productName; }

        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }

    public static class AdminOrderItem {
        private Long id;
        private String customerName;
        private Double totalAmount;
        private String status;
        private String createdAt;
        private Integer itemsCount;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getCustomerName() { return customerName; }
        public void setCustomerName(String customerName) { this.customerName = customerName; }

        public Double getTotalAmount() { return totalAmount; }
        public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public String getCreatedAt() { return createdAt; }
        public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

        public Integer getItemsCount() { return itemsCount; }
        public void setItemsCount(Integer itemsCount) { this.itemsCount = itemsCount; }
    }

    public static class StatusUpdateRequest {
        private String status;

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
}
