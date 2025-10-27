package com.PinoyHeritage.Backend.entity;
 
import jakarta.persistence.*;

import java.util.List;
 
@Entity

@Table(name = "customer")

public class Customer {

    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
 
    @Column(nullable = false, unique = true)

    private String username;
 
    @Column(nullable = false)

    private String password;
 
    @Column(nullable = false)

    private String email;
 
    // Relationships

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)

    private List<Cart> carts;
 
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)

    private List<Order> orders;
 
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)

    private List<Review> reviews;
 
    // Getters and Setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }

    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public List<Cart> getCarts() { return carts; }

    public void setCarts(List<Cart> carts) { this.carts = carts; }

    public List<Order> getOrders() { return orders; }

    public void setOrders(List<Order> orders) { this.orders = orders; }

    public List<Review> getReviews() { return reviews; }

    public void setReviews(List<Review> reviews) { this.reviews = reviews; }

}
 