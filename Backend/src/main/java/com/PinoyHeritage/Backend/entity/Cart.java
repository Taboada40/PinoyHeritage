package com.PinoyHeritage.Backend.entity;
 
import jakarta.persistence.*;

import java.util.List;
 
@Entity

@Table(name = "cart")

public class Cart {

    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
 
    // Relationships

    @ManyToOne

    @JoinColumn(name = "customer_id", nullable = false)

    private Customer customer;
 
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)

    private List<CartItem> cartItems;
 
    // Getters and Setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Customer getCustomer() { return customer; }

    public void setCustomer(Customer customer) { this.customer = customer; }

    public List<CartItem> getCartItems() { return cartItems; }

    public void setCartItems(List<CartItem> cartItems) { this.cartItems = cartItems; }

}
 