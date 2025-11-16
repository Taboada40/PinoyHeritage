package com.PinoyHeritage.Backend.entity;
 
import jakarta.persistence.*;

import java.util.List;
 
@Entity

@Table(name = "order_table")  // "order" is a reserved keyword

public class Order {

    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
 
    @Column(nullable = false)

    private Double totalAmount;
 
    // Relationships

    @ManyToOne

    @JoinColumn(name = "customer_id", nullable = false)

    private Customer customer;
 
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)

    private List<Item> items;  // Assuming items are products; add quantity to Item if needed
 
    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)

    private Payment payment;
 
    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)

    private Delivery delivery;
 
    // Getters and Setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Double getTotalAmount() { return totalAmount; }

    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

    public Customer getCustomer() { return customer; }

    public void setCustomer(Customer customer) { this.customer = customer; }

    public List<Item> getItems() { return items; }

    public void setItems(List<Item> items) { this.items = items; }

    public Payment getPayment() { return payment; }

    public void setPayment(Payment payment) { this.payment = payment; }

    public Delivery getDelivery() { return delivery; }

    public void setDelivery(Delivery delivery) { this.delivery = delivery; }

}
 