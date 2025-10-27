package com.PinoyHeritage.Backend.entity;
 
import jakarta.persistence.*;
 
@Entity

@Table(name = "review")

public class Review {

    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
 
    @Column(nullable = false)

    private Integer rating;  // e.g., 1-5
 
    @Column(nullable = false)

    private String comment;
 
    // Relationships

    @ManyToOne

    @JoinColumn(name = "item_id", nullable = false)

    private Item item;
 
    @ManyToOne

    @JoinColumn(name = "customer_id", nullable = false)

    private Customer customer;
 
    // Getters and Setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Integer getRating() { return rating; }

    public void setRating(Integer rating) { this.rating = rating; }

    public String getComment() { return comment; }

    public void setComment(String comment) { this.comment = comment; }

    public Item getItem() { return item; }

    public void setItem(Item item) { this.item = item; }

    public Customer getCustomer() { return customer; }

    public void setCustomer(Customer customer) { this.customer = customer; }

}
 