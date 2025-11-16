package com.PinoyHeritage.Backend.entity;
 
import jakarta.persistence.*;
 
@Entity
@Table(name = "cart_item")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    @Column(nullable = false)
    private Integer quantity;
 
    // Relationships
    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;
 
    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;
 
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public Cart getCart() { return cart; }
    public void setCart(Cart cart) { this.cart = cart; }
    public Item getItem() { return item; }
    public void setItem(Item item) { this.item = item; }
}