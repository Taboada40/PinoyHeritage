package com.PinoyHeritage.Backend.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "order_table")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double totalAmount;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    // Relationship: One order → multiple product entries
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<ProductOrder> products;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    private Payment payment;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    private Delivery delivery;

    // Getters and Setters

    public Long getId() { 
        return id; 
    }

    public void setId(Long id) { 
        this.id = id; 
    }

    public Double getTotalAmount() { 
        return totalAmount; 
    }

    public void setTotalAmount(Double totalAmount) { 
        this.totalAmount = totalAmount; 
    }

    public Customer getCustomer() { 
        return customer; 
    }

    public void setCustomer(Customer customer) { 
        this.customer = customer; 
    }

    public List<ProductOrder> getProducts() { 
        return products; 
    }

    public void setProducts(List<ProductOrder> products) { 
        this.products = products; 
    }

    public Payment getPayment() { 
        return payment; 
    }

    public void setPayment(Payment payment) { 
        this.payment = payment; 
    }

    public Delivery getDelivery() { 
        return delivery; 
    }

    public void setDelivery(Delivery delivery) { 
        this.delivery = delivery; 
    }
}
