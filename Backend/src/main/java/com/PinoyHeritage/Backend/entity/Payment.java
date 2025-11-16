package com.PinoyHeritage.Backend.entity;
 
import jakarta.persistence.*;
 
@Entity

@Table(name = "payment")

public class Payment {

    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
 
    @Column(nullable = false)

    private String method;  // e.g., "Credit Card", "PayPal"
 
    @Column(nullable = false)

    private String status;  // e.g., "Pending", "Completed"
 
    // Relationships

    @OneToOne

    @JoinColumn(name = "order_id", nullable = false)

    private Order order;
 
    // Getters and Setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getMethod() { return method; }

    public void setMethod(String method) { this.method = method; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }

    public Order getOrder() { return order; }

    public void setOrder(Order order) { this.order = order; }

}
 