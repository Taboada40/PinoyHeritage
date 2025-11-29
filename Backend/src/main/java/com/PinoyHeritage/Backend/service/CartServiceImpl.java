package com.PinoyHeritage.Backend.service;

import com.PinoyHeritage.Backend.entity.Cart;
import com.PinoyHeritage.Backend.entity.CartItem;
import com.PinoyHeritage.Backend.entity.Customer;
import com.PinoyHeritage.Backend.entity.Category;
import com.PinoyHeritage.Backend.repository.CartRepository;
import com.PinoyHeritage.Backend.repository.CartItemRepository;
import com.PinoyHeritage.Backend.repository.CustomerRepository;
import com.PinoyHeritage.Backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        Cart cart = getOrCreateCart(customerId);

        // Validate category exists
        if (cartItem.getCategory() == null || cartItem.getCategory().getId() == null) {
            throw new RuntimeException("Category is required for cart item");
        }

        Category category = categoryRepository.findById(cartItem.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + cartItem.getCategory().getId()));
        
        cartItem.setCategory(category);

        // Check if item already exists in cart
        Optional<CartItem> existingItem = cartItemRepository
                .findByCartIdAndProductName(cart.getId(), cartItem.getProductName());

        if (existingItem.isPresent()) {
            // Update quantity if item exists
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + cartItem.getQuantity());
            // Update image if provided
            if (cartItem.getProductImage() != null) {
                item.setProductImage(cartItem.getProductImage());
            }
            // Update size if provided
            if (cartItem.getSize() != null) {
                item.setSize(cartItem.getSize());
            }
            cartItemRepository.save(item);
        } else {
            // Add new item
            cartItem.setCart(cart);
            cartItemRepository.save(cartItem);
        }

        // Refresh cart and calculate total
        cart = getCartByCustomerId(customerId);
        cart.calculateTotalAmount();
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
        Cart cart = getCartByCustomerId(customerId);
        
        CartItem cartItem = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found with id: " + itemId));

        if (!cartItem.getCart().getId().equals(cart.getId())) {
            throw new RuntimeException("Cart item does not belong to customer's cart");
        }

        cartItemRepository.delete(cartItem);
        
        cart.calculateTotalAmount();
        return cartRepository.save(cart);
    }

    @Override
    public void clearCart(Long customerId) {
        Cart cart = getCartByCustomerId(customerId);
        cartItemRepository.deleteByCartId(cart.getId());
        
        cart.setTotalAmount(0.0);
        cartRepository.save(cart);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CartItem> getCartItems(Long customerId) {
        Cart cart = getCartByCustomerId(customerId);
        return cart.getCartItems();
    }

    @Override
    @Transactional(readOnly = true)
    public Double getCartTotal(Long customerId) {
        Cart cart = getCartByCustomerId(customerId);
        return cart.getTotalAmount();
    }

    private Cart getOrCreateCart(Long customerId) {
        try {
            return getCartByCustomerId(customerId);
        } catch (RuntimeException e) {
            return createCart(customerId);
        }
    }
}