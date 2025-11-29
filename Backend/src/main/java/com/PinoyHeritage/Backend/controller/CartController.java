package com.PinoyHeritage.Backend.controller;

import com.PinoyHeritage.Backend.entity.Cart;
import com.PinoyHeritage.Backend.entity.CartItem;
import com.PinoyHeritage.Backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<Cart> getCart(@PathVariable Long customerId) {
        Cart cart = cartService.getCartByCustomerId(customerId);
        return ResponseEntity.ok(cart);
    }

    @GetMapping("/customer/{customerId}/items")
    public ResponseEntity<List<CartItem>> getCartItems(@PathVariable Long customerId) {
        List<CartItem> cartItems = cartService.getCartItems(customerId);
        return ResponseEntity.ok(cartItems);
    }

    @PostMapping("/customer/{customerId}/items")
    public ResponseEntity<Cart> addItemToCart(@PathVariable Long customerId, 
                                             @RequestBody CartItem cartItem) {
        Cart cart = cartService.addItemToCart(customerId, cartItem);
        return ResponseEntity.ok(cart);
    }

    @PutMapping("/customer/{customerId}/items/{itemId}")
    public ResponseEntity<Cart> updateCartItemQuantity(@PathVariable Long customerId,
                                                      @PathVariable Long itemId,
                                                      @RequestParam Integer quantity) {
        Cart cart = cartService.updateCartItemQuantity(customerId, itemId, quantity);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/customer/{customerId}/items/{itemId}")
    public ResponseEntity<Cart> removeItemFromCart(@PathVariable Long customerId,
                                                  @PathVariable Long itemId) {
        Cart cart = cartService.removeItemFromCart(customerId, itemId);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/customer/{customerId}/clear")
    public ResponseEntity<Void> clearCart(@PathVariable Long customerId) {
        cartService.clearCart(customerId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/customer/{customerId}/total")
    public ResponseEntity<Double> getCartTotal(@PathVariable Long customerId) {
        Double total = cartService.getCartTotal(customerId);
        return ResponseEntity.ok(total);
    }
}