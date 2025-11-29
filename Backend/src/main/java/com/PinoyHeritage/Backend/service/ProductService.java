package com.PinoyHeritage.Backend.service;

import com.PinoyHeritage.Backend.entity.Product;
import com.PinoyHeritage.Backend.entity.Category;
import com.PinoyHeritage.Backend.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@SuppressWarnings("unused")
@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService; 

    public ProductService(ProductRepository productRepository, CategoryService categoryService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }


    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    // Simple save
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    // Transactional save that handles saving the image as Base64 in database
    @Transactional
    public Product addProductWithImage(Product product, MultipartFile[] images) throws IOException {
        if (images != null && images.length > 0 && !images[0].isEmpty()) {
            MultipartFile file = images[0];
            byte[] imageBytes = file.getBytes();
            String imageType = getImageType(file.getOriginalFilename());
            String base64Image = "data:image/" + imageType + ";base64," + 
                                Base64.getEncoder().encodeToString(imageBytes);
            product.setImageUrl(base64Image);
        }

        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(updatedProduct.getName());
                    product.setDescription(updatedProduct.getDescription());
                    product.setPrice(updatedProduct.getPrice());
                    product.setStock(updatedProduct.getStock());
                    product.setSizes(updatedProduct.getSizes()); 

                    // Handle category updates
                    if (updatedProduct.getCategory() != null) {
                        product.setCategory(updatedProduct.getCategory());
                    }

                    return productRepository.save(product);
                })
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    // Save image(s) for an existing product and update imageUrl (uses first image, stored as Base64)
    public Product addImageForProduct(Long productId, MultipartFile[] images) throws IOException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        if (images != null && images.length > 0 && !images[0].isEmpty()) {
            MultipartFile file = images[0];
            byte[] imageBytes = file.getBytes();
            String imageType = getImageType(file.getOriginalFilename());
            String base64Image = "data:image/" + imageType + ";base64," + 
                                Base64.getEncoder().encodeToString(imageBytes);
            product.setImageUrl(base64Image);
            return productRepository.save(product);
        }

        return product;
    }

    // Helper method to determine image type from filename
    private String getImageType(String filename) {
        if (filename == null) return "jpeg";
        String lower = filename.toLowerCase();
        if (lower.endsWith(".png")) return "png";
        if (lower.endsWith(".gif")) return "gif";
        if (lower.endsWith(".webp")) return "webp";
        return "jpeg";
    }
}