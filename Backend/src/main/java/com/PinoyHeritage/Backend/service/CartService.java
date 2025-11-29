package com.PinoyHeritage.Backend.service;

import com.PinoyHeritage.Backend.entity.Cart;
import com.PinoyHeritage.Backend.entity.CartItem;
import java.util.List;

public interface CartService {
    Cart getCartByCustomerId(Long customerId);
    Cart createCart(Long customerId);
    Cart addItemToCart(Long customerId, CartItem cartItem);
    Cart updateCartItemQuantity(Long customerId, Long itemId, Integer quantity);
    Cart removeItemFromCart(Long customerId, Long itemId);
    void clearCart(Long customerId);
    List<CartItem> getCartItems(Long customerId);
    Double getCartTotal(Long customerId);
}
