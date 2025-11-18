package com.PinoyHeritage.Backend.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@Entity
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 1000) // Increased length for description
    private String description;

    @Column(nullable = false)
    private Double price;

    private Integer stock; // Added for Frontend compatibility

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String image; // Added to store Base64 image string

    // Relationships
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    @JsonIgnoreProperties("items") // Prevent infinite recursion
    private Category category;
    
    @ManyToOne
    @JoinColumn(name = "order_id") 
    private Order order; 

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("item")
    private List<CartItem> cartItems;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("item")
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

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }

    public List<CartItem> getCartItems() { return cartItems; }
    public void setCartItems(List<CartItem> cartItems) { this.cartItems = cartItems; }

    public List<Review> getReviews() { return reviews; }
    public void setReviews(List<Review> reviews) { this.reviews = reviews; }
}