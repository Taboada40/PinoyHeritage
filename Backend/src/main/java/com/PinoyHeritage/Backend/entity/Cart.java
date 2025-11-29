package com.PinoyHeritage.Backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "cart")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relationships
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    @JsonIgnore
    private Customer customer;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<CartItem> cartItems;

    @Column(name = "total_amount", nullable = false)
    private Double totalAmount = 0.0;

    // Constructors
    public Cart() {}

    public Cart(Customer customer) {
        this.customer = customer;
        this.totalAmount = 0.0;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }

    public List<CartItem> getCartItems() { return cartItems; }
    public void setCartItems(List<CartItem> cartItems) { this.cartItems = cartItems; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

    // Helper to recalculate total from items
    public void calculateTotalAmount() {
        if (cartItems == null || cartItems.isEmpty()) {
            this.totalAmount = 0.0;
        } else {
            this.totalAmount = cartItems.stream()
                    .mapToDouble(ci -> ci.getAmount() != null ? ci.getAmount() : 0.0)
                    .sum();
        }
    }
}
