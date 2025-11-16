package com.PinoyHeritage.Backend.entity;
 
import jakarta.persistence.*;
 
@Entity
@Table(name = "delivery")
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    @Column(nullable = false)
    private String address;
 
    @Column(nullable = false)
    private String status;  // e.g., "Pending", "Shipped", "Delivered"
 
    // Relationships
    @OneToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
 
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }
}