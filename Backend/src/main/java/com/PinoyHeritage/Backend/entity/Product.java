package com.PinoyHeritage.Backend.entity;
 
import jakarta.persistence.*;

import java.util.List;
 
@Entity

@Table(name = "product")

public class Product {

    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
 
    @Column(nullable = false)

    private String name;
 
    @Column(nullable = false)

    private String description;
 
    @Column(nullable = false)

    private Double price;
 
    // Relationships

    @ManyToOne

    @JoinColumn(name = "category_id", nullable = false)

    private Category category;
 
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)

    private List<CartItem> cartItems;
 
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)

    private List<Review> reviews;
 
    // Getters and Setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public Double getPrice() { return price; }

    public void setPrice(Double price) { this.price = price; }

    public Category getCategory() { return category; }

    public void setCategory(Category category) { this.category = category; }

    public List<CartItem> getCartItems() { return cartItems; }

    public void setCartItems(List<CartItem> cartItems) { this.cartItems = cartItems; }

    public List<Review> getReviews() { return reviews; }

    public void setReviews(List<Review> reviews) { this.reviews = reviews; }

}
 