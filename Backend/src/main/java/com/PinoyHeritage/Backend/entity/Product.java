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

    private String description;

    private Double price;

    private Integer stock;

    // Store sizes as JSON array in database
    @Column(columnDefinition = "JSON")
    private String sizes; 

    // Store ONE image as Base64
    @Column(columnDefinition = "LONGTEXT")
    private String imageUrl;

    // Relationship: Many products → One category
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    // Getters & Setters
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

    public String getSizes() { return sizes; }
    public void setSizes(String sizes) { this.sizes = sizes; }

    // Helper methods to work with sizes as List
    public List<String> getSizesList() {
        if (sizes == null || sizes.trim().isEmpty()) return List.of();
        try {
            String clean = sizes.replace("[", "").replace("]", "").replace("\"", "");
            return List.of(clean.split(","));
        } catch (Exception e) {
            return List.of();
        }
    }

    public void setSizesList(List<String> sizeList) {
        if (sizeList == null || sizeList.isEmpty()) {
            this.sizes = null;
        } else {
            this.sizes = "[\"" + String.join("\",\"", sizeList) + "\"]";
        }
    }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
}