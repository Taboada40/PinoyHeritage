package com.PinoyHeritage.Backend.dto;

public class ReviewRequest {
    private Integer rating;
    private String comment;
    private Long customerId;

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }
}
