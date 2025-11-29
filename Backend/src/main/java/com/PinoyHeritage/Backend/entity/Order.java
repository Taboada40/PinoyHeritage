package com.PinoyHeritage.Backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "order_table")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double totalAmount;

    @Column(nullable = false)
    private String status = "Pending";

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    @JsonIgnore
    private Customer customer;

    // Relationship: One order → multiple product entries
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<ProductOrder> products;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonIgnore
    private Payment payment;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonIgnore
    private Delivery delivery;

    // Getters and Setters

    public Long getId() { 
        return id; 
    }

    public void setId(Long id) { 
        this.id = id; 
    }

    public Double getTotalAmount() { 
        return totalAmount; 
    }

    public void setTotalAmount(Double totalAmount) { 
        this.totalAmount = totalAmount; 
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Customer getCustomer() { 
        return customer; 
    }

    public void setCustomer(Customer customer) { 
        this.customer = customer; 
    }

    public List<ProductOrder> getProducts() { 
        return products; 
    }

    public void setProducts(List<ProductOrder> products) { 
        this.products = products; 
    }

    public Payment getPayment() { 
        return payment; 
    }

    public void setPayment(Payment payment) { 
        this.payment = payment; 
    }

    public Delivery getDelivery() { 
        return delivery; 
    }

    public void setDelivery(Delivery delivery) { 
        this.delivery = delivery; 
    }
}
