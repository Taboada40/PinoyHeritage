package com.PinoyHeritage.Backend.controller;

import com.PinoyHeritage.Backend.entity.Product;
import com.PinoyHeritage.Backend.entity.Category;
import com.PinoyHeritage.Backend.service.ProductService;
import com.PinoyHeritage.Backend.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/products")
public class ProductController {

    private final ProductService productService;
    private final CategoryService categoryService;

    public ProductController(ProductService productService, CategoryService categoryService) {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Product> getProducts() {
        return productService.getAllProducts();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        try {
            // If category is provided, resolve it from database
            if (product.getCategory() != null && product.getCategory().getId() != null) {
                // Category is already set from frontend, just save
            } else if (product.getCategory() != null && product.getCategory().getName() != null) {
                // Category by name - find or create
                Optional<Category> catOpt = categoryService.findByName(product.getCategory().getName());
                Category category = catOpt.orElseGet(() -> categoryService.addCategory(new Category(product.getCategory().getName())));
                product.setCategory(category);
            }

            Product savedProduct = productService.addProduct(product);
            return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Upload images for an existing product
    @PostMapping(value = "/{id}/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Product> uploadImagesForProduct(@PathVariable Long id,
                                                    @RequestPart(value = "images", required = false) MultipartFile[] images) {
        try {
            Product updated = productService.addImageForProduct(id, images);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        try {
            Product updated = productService.updateProduct(id, productDetails);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}