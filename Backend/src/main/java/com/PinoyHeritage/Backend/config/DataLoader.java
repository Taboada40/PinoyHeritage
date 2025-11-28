package com.PinoyHeritage.Backend.config;

import com.PinoyHeritage.Backend.entity.Product;
import com.PinoyHeritage.Backend.entity.Category;
import com.PinoyHeritage.Backend.repository.ProductRepository;
import com.PinoyHeritage.Backend.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@SuppressWarnings("unused")
@Component
public class DataLoader implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public DataLoader(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("===== DATABASE INITIALIZATION =====");
        System.out.println("[DataLoader] Clearing all existing products and categories...");
        
        // Delete all products first (due to foreign key constraints)
        productRepository.deleteAll();
        System.out.println("[DataLoader] ✓ All products cleared");
        
        // Delete all categories
        categoryRepository.deleteAll();
        System.out.println("[DataLoader] ✓ All categories cleared");
        
        System.out.println("[DataLoader] Database is now empty - ready for new products");
        System.out.println("[DataLoader] Admin can now add products via the UI");
        System.out.println("===== INITIALIZATION COMPLETE =====\n");
    }
}
