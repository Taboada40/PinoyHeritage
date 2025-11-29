package com.PinoyHeritage.Backend.controller;

import com.PinoyHeritage.Backend.dto.CartItemRequest;
import com.PinoyHeritage.Backend.entity.Cart;
import com.PinoyHeritage.Backend.entity.CartItem;
import com.PinoyHeritage.Backend.entity.Customer;
import com.PinoyHeritage.Backend.repository.CustomerRepository;
import com.PinoyHeritage.Backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;
    
    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<?> getCart(@PathVariable Long customerId) {
        try {
            Optional<Customer> customer = customerRepository.findById(customerId);
            if (!customer.isPresent()) {
                // Return empty cart info if customer not found
                Map<String, Object> emptyCart = new HashMap<>();
                emptyCart.put("id", null);
                emptyCart.put("totalAmount", 0.0);
                return ResponseEntity.ok(emptyCart);
            }
            Cart cart = cartService.getCartByCustomerId(customerId);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            // Return empty cart info if not found
            Map<String, Object> emptyCart = new HashMap<>();
            emptyCart.put("id", null);
            emptyCart.put("totalAmount", 0.0);
            return ResponseEntity.ok(emptyCart);
        }
    }

    // Debug endpoint to check customer and cart status
    @GetMapping("/debug/{customerId}")
    public ResponseEntity<?> debugCart(@PathVariable Long customerId) {
        Map<String, Object> debug = new HashMap<>();
        debug.put("customerId", customerId);
        
        try {
            // Check if customer exists
            Optional<Customer> customer = customerRepository.findById(customerId);
            debug.put("customerExists", customer.isPresent());
            
            if (customer.isPresent()) {
                debug.put("customerEmail", customer.get().getEmail());
                debug.put("customerUsername", customer.get().getUsername());
            }
            
            if (!customer.isPresent()) {
                debug.put("error", "Customer not found with ID: " + customerId);
                return ResponseEntity.ok(debug);
            }
            
            // Try to get cart (don't create if not exists)
            try {
                Cart cart = cartService.getCartByCustomerId(customerId);
                debug.put("cartId", cart.getId());
                debug.put("cartTotal", cart.getTotalAmount());
            } catch (Exception e) {
                debug.put("cartExists", false);
                debug.put("cartError", e.getMessage());
            }
            
            // Get items
            List<CartItem> items = cartService.getCartItems(customerId);
            debug.put("itemCount", items.size());
            debug.put("status", "OK");
        } catch (Exception e) {
            debug.put("error", e.getMessage());
            debug.put("errorType", e.getClass().getSimpleName());
            e.printStackTrace();
        }
        
        return ResponseEntity.ok(debug);
    }

    @GetMapping("/customer/{customerId}/items")
    public ResponseEntity<?> getCartItems(@PathVariable Long customerId) {
        try {
            List<CartItem> cartItems = cartService.getCartItems(customerId);
            return ResponseEntity.ok(cartItems);
        } catch (Exception e) {
            e.printStackTrace();
            // Return empty list on error instead of 500
            return ResponseEntity.ok(new ArrayList<>());
        }
    }

    @PostMapping("/customer/{customerId}/items")
    public ResponseEntity<?> addItemToCart(@PathVariable Long customerId, 
                                             @RequestBody CartItemRequest request) {
        try {
            System.out.println("=== Controller: Adding item for customer " + customerId + " ===");
            
            // First check if customer exists
            Optional<Customer> customer = customerRepository.findById(customerId);
            if (!customer.isPresent()) {
                System.out.println("ERROR: Customer not found with ID: " + customerId);
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Customer not found with ID: " + customerId);
                error.put("success", false);
                return ResponseEntity.status(400).body(error);
            }
            
            System.out.println("Customer found: " + customer.get().getEmail());
            System.out.println("Product: " + request.getProductName());
            System.out.println("Quantity: " + request.getQuantity());
            System.out.println("UnitPrice: " + request.getUnitPrice());
            System.out.println("CategoryId: " + request.getCategoryId());
            
            Cart cart = cartService.addItemToCartFromRequest(
                customerId,
                request.getProductName(),
                request.getCategoryId(),
                request.getQuantity(),
                request.getUnitPrice(),
                request.getProductImage(),
                request.getSize()
            );
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", cart.getId());
            response.put("totalAmount", cart.getTotalAmount());
            response.put("message", "Item added to cart");
            response.put("success", true);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println("ERROR adding to cart: " + e.getMessage());
            e.printStackTrace();
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            error.put("errorType", e.getClass().getSimpleName());
            error.put("success", false);
            return ResponseEntity.status(500).body(error);
        }
    }

    @PutMapping("/customer/{customerId}/items/{itemId}")
    public ResponseEntity<?> updateCartItemQuantity(@PathVariable Long customerId,
                                                      @PathVariable Long itemId,
                                                      @RequestParam Integer quantity) {
        try {
            Cart cart = cartService.updateCartItemQuantity(customerId, itemId, quantity);
            Map<String, Object> response = new HashMap<>();
            response.put("id", cart.getId());
            response.put("totalAmount", cart.getTotalAmount());
            response.put("message", "Cart item quantity updated");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    @DeleteMapping("/customer/{customerId}/items/{itemId}")
    public ResponseEntity<?> removeItemFromCart(@PathVariable Long customerId,
                                                  @PathVariable Long itemId) {
        try {
            Cart cart = cartService.removeItemFromCart(customerId, itemId);
            Map<String, Object> response = new HashMap<>();
            response.put("id", cart.getId());
            response.put("totalAmount", cart.getTotalAmount());
            response.put("message", "Item removed from cart");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
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