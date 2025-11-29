package com.PinoyHeritage.Backend.service;

import com.PinoyHeritage.Backend.entity.Cart;
import com.PinoyHeritage.Backend.entity.CartItem;
import com.PinoyHeritage.Backend.entity.Customer;
import com.PinoyHeritage.Backend.entity.Category;
import com.PinoyHeritage.Backend.entity.Product;
import com.PinoyHeritage.Backend.repository.CartRepository;
import com.PinoyHeritage.Backend.repository.CartItemRepository;
import com.PinoyHeritage.Backend.repository.CustomerRepository;
import com.PinoyHeritage.Backend.repository.CategoryRepository;
import com.PinoyHeritage.Backend.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    @Transactional(readOnly = true)
    public Cart getCartByCustomerId(Long customerId) {
        return cartRepository.findByCustomerIdWithItems(customerId)
                .orElseThrow(() -> new RuntimeException("Cart not found for customer id: " + customerId));
    }

    @Override
    public Cart createCart(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + customerId));

        if (cartRepository.existsByCustomerId(customerId)) {
            throw new RuntimeException("Cart already exists for customer id: " + customerId);
        }

        Cart cart = new Cart(customer);
        return cartRepository.save(cart);
    }

    @Override
    public Cart addItemToCart(Long customerId, CartItem cartItem) {
        System.out.println("=== Adding item to cart for customer: " + customerId + " ===");
        System.out.println("Product: " + cartItem.getProductName());
        System.out.println("Quantity: " + cartItem.getQuantity());
        System.out.println("UnitPrice: " + cartItem.getUnitPrice());
        
        Cart cart = getOrCreateCart(customerId);
        System.out.println("Cart ID: " + cart.getId());

        // Resolve category from database - never use the one from request directly
        Category category = null;
        try {
            if (cartItem.getCategory() != null && cartItem.getCategory().getId() != null) {
                category = categoryRepository.findById(cartItem.getCategory().getId()).orElse(null);
            }
            if (category == null && cartItem.getProductName() != null) {
                Optional<Product> productOpt = productRepository.findByName(cartItem.getProductName());
                if (productOpt.isPresent()) {
                    category = productOpt.get().getCategory();
                }
            }
        } catch (Exception e) {
            System.out.println("Category resolution failed: " + e.getMessage());
            category = null;
        }

        // Ensure required fields have defaults BEFORE any other operations
        Integer quantity = cartItem.getQuantity() != null ? cartItem.getQuantity() : 1;
        Double unitPrice = cartItem.getUnitPrice() != null ? cartItem.getUnitPrice() : 0.0;
        Double amount = quantity * unitPrice;
        String productName = cartItem.getProductName();
        String productImage = cartItem.getProductImage();
        String size = cartItem.getSize();

        // Check if item already exists in cart
        Optional<CartItem> existingItem = cartItemRepository
                .findByCartIdAndProductName(cart.getId(), productName);

        if (existingItem.isPresent()) {
            // Update existing item
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            if (productImage != null) {
                item.setProductImage(productImage);
            }
            if (size != null) {
                item.setSize(size);
            }
            item.setCustomerId(customerId);
            item.setAmount(item.getQuantity() * item.getUnitPrice());
            cartItemRepository.save(item);
            System.out.println("Updated existing cart item: " + item.getId());
        } else {
            // Create new CartItem manually to avoid any serialization issues
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setCustomerId(customerId);
            newItem.setProductName(productName);
            newItem.setCategory(category);
            newItem.setQuantity(quantity);
            newItem.setUnitPrice(unitPrice);
            newItem.setAmount(amount);
            newItem.setProductImage(productImage);
            newItem.setSize(size);
            cartItemRepository.save(newItem);
            System.out.println("Created new cart item: " + newItem.getId());
        }

        // Calculate total from all items for this customer
        List<CartItem> allItems = cartItemRepository.findByCustomerId(customerId);
        double total = 0.0;
        for (CartItem item : allItems) {
            if (item.getAmount() != null) {
                total += item.getAmount();
            }
        }
        cart.setTotalAmount(total);
        System.out.println("Cart total: " + total);
        return cartRepository.save(cart);
    }

    @Override
    public Cart updateCartItemQuantity(Long customerId, Long itemId, Integer quantity) {
        Cart cart = getCartByCustomerId(customerId);

        CartItem cartItem = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found with id: " + itemId));

        if (!cartItem.getCart().getId().equals(cart.getId())) {
            throw new RuntimeException("Cart item does not belong to customer's cart");
        }

        cartItem.setQuantity(quantity);
        cartItemRepository.save(cartItem);

        cart.calculateTotalAmount();
        return cartRepository.save(cart);
    }

    @Override
    public Cart removeItemFromCart(Long customerId, Long itemId) {
        // Get cart without loading items to avoid Hibernate issues
        Cart cart = cartRepository.findByCustomerId(customerId)
                .orElseThrow(() -> new RuntimeException("Cart not found for customer: " + customerId));

        CartItem cartItem = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found with id: " + itemId));

        if (!cartItem.getCart().getId().equals(cart.getId())) {
            throw new RuntimeException("Cart item does not belong to customer's cart");
        }

        cartItemRepository.delete(cartItem);
        cartItemRepository.flush();

        // Recalculate total from remaining items
        List<CartItem> remainingItems = cartItemRepository.findByCustomerId(customerId);
        double total = remainingItems.stream()
                .mapToDouble(item -> item.getAmount() != null ? item.getAmount() : 0.0)
                .sum();
        cart.setTotalAmount(total);
        return cartRepository.save(cart);
    }

    @Override
    public void clearCart(Long customerId) {
        // Get cart without loading items to avoid Hibernate cascade issues
        Cart cart = cartRepository.findByCustomerId(customerId).orElse(null);
        if (cart == null) return;
        
        // Delete items directly by customer_id to avoid cascade issues
        cartItemRepository.deleteByCartId(cart.getId());
        cartItemRepository.flush();

        cart.setTotalAmount(0.0);
        cartRepository.save(cart);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CartItem> getCartItems(Long customerId) {
        // Use direct query to avoid lazy loading issues
        List<CartItem> items = cartItemRepository.findByCustomerId(customerId);
        if (items == null || items.isEmpty()) {
            // Fallback: try via cart relationship
            items = cartItemRepository.findByCartCustomerId(customerId);
        }
        return items != null ? items : new ArrayList<>();
    }

    @Override
    @Transactional(readOnly = true)
    public Double getCartTotal(Long customerId) {
        Cart cart = getCartByCustomerId(customerId);
        return cart.getTotalAmount();
    }

    @Override
    public Cart addItemToCartFromRequest(Long customerId, String productName, Long categoryId,
                                          Integer quantity, Double unitPrice, String productImage, String size) {
        System.out.println("=== addItemToCartFromRequest for customer: " + customerId + " ===");
        System.out.println("Product: " + productName + ", Qty: " + quantity + ", Price: " + unitPrice);
        
        Cart cart = getOrCreateCart(customerId);
        System.out.println("Cart ID: " + cart.getId());

        Category category = null;
        if (categoryId != null) {
            category = categoryRepository.findById(categoryId).orElse(null);
        }
        if (category == null && productName != null) {
            Optional<Product> productOpt = productRepository.findByName(productName);
            if (productOpt.isPresent()) {
                category = productOpt.get().getCategory();
            }
        }

        int qty = quantity != null ? quantity : 1;
        double price = unitPrice != null ? unitPrice : 0.0;
        double amount = qty * price;

        Optional<CartItem> existingItem = cartItemRepository.findByCartIdAndProductName(cart.getId(), productName);

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + qty);
            item.setAmount(item.getQuantity() * item.getUnitPrice());
            if (productImage != null) item.setProductImage(productImage);
            if (size != null) item.setSize(size);
            item.setCustomerId(customerId);
            cartItemRepository.save(item);
            System.out.println("Updated cart item ID: " + item.getId());
        } else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setCustomerId(customerId);
            newItem.setProductName(productName);
            newItem.setCategory(category);
            newItem.setQuantity(qty);
            newItem.setUnitPrice(price);
            newItem.setAmount(amount);
            newItem.setProductImage(productImage);
            newItem.setSize(size);
            cartItemRepository.save(newItem);
            System.out.println("Created cart item ID: " + newItem.getId());
        }

        List<CartItem> allItems = cartItemRepository.findByCustomerId(customerId);
        double total = allItems.stream()
                .mapToDouble(item -> item.getAmount() != null ? item.getAmount() : 0.0)
                .sum();
        cart.setTotalAmount(total);
        System.out.println("Cart total: " + total);
        
        return cartRepository.save(cart);
    }

    private Cart getOrCreateCart(Long customerId) {
        Optional<Cart> existingCart = cartRepository.findByCustomerId(customerId);
        if (existingCart.isPresent()) {
            return existingCart.get();
        }
        
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + customerId));
        
        Cart cart = new Cart(customer);
        return cartRepository.save(cart);
    }
}