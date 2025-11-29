package com.PinoyHeritage.Backend.config;

import com.PinoyHeritage.Backend.repository.ProductRepository;
import com.PinoyHeritage.Backend.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;

@SuppressWarnings("unused")
public class DataLoader implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public DataLoader(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Disabled: previously cleared products and categories on startup.
        // Intentionally left as a no-op to preserve existing data.
        System.out.println("[DataLoader] Startup data initialization is disabled (no-op).");
    }
}
