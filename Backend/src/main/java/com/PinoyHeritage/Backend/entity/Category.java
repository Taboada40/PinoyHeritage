package com.PinoyHeritage.Backend.entity;
 
import jakarta.persistence.*;
import java.util.List;
 
@Entity
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    @Column(nullable = false, unique = true)
    private String name;
 
    // Relationships
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Item> items;
 
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public List<Item> getItems() { return items; }
    public void setItems(List<Item> items) { this.items = items; }
}