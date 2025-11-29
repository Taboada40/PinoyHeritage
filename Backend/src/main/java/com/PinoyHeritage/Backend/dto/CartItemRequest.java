package com.PinoyHeritage.Backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.Map;

/**
 * DTO for receiving cart item data from frontend.
 * This avoids issues with JPA entity deserialization.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class CartItemRequest {
    private String productName;
    private Long categoryId;
    private Object category; // Can be { "id": 1 } or null
    private Integer quantity;
    private Double unitPrice;
    private Double amount;
    private String productImage;
    private String size;

    // Default constructor
    public CartItemRequest() {}

    // Getters and Setters
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public Long getCategoryId() { 
        // Try to get from categoryId first, then from category object
        if (categoryId != null) {
            return categoryId;
        }
        if (category != null && category instanceof Map) {
            Object id = ((Map<?, ?>) category).get("id");
            if (id != null) {
                if (id instanceof Number) {
                    return ((Number) id).longValue();
                }
                try {
                    return Long.parseLong(id.toString());
                } catch (NumberFormatException e) {
                    return null;
                }
            }
        }
        return null;
    }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

    public Object getCategory() { return category; }
    public void setCategory(Object category) { this.category = category; }

    public Integer getQuantity() { return quantity != null ? quantity : 1; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Double getUnitPrice() { return unitPrice != null ? unitPrice : 0.0; }
    public void setUnitPrice(Double unitPrice) { this.unitPrice = unitPrice; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getProductImage() { return productImage; }
    public void setProductImage(String productImage) { this.productImage = productImage; }

    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }
}
