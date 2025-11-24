package com.PinoyHeritage.Backend.controller;

import com.PinoyHeritage.Backend.entity.Item;
import com.PinoyHeritage.Backend.entity.Category;
import com.PinoyHeritage.Backend.service.ItemService;
import com.PinoyHeritage.Backend.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.util.Map;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/products") // Matches the endpoint in AdminCategories.jsx
public class ItemController {

    private final ItemService itemService;
    private final CategoryService categoryService;

    public ItemController(ItemService itemService, CategoryService categoryService) {
        this.itemService = itemService;
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Item> getItems() {
        // Returns all items, including their category information
        return itemService.getAllItems();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Item> addItem(
            @RequestPart("name") String name,
            @RequestPart(value = "category", required = false) String categoryName,
            @RequestPart(value = "price", required = false) Double price,
            @RequestPart(value = "stock", required = false) Integer stock,
            @RequestPart(value = "description", required = false) String description,
            @RequestPart(value = "images", required = false) MultipartFile[] images
    ) {
        try {
            Item item = new Item();
            item.setName(name);
            item.setDescription(description != null ? description : "");
            item.setPrice(price != null ? price : 0.0);

            // Resolve or create category
            if (categoryName != null && !categoryName.isEmpty()) {
                Optional<Category> catOpt = categoryService.findByName(categoryName);
                Category category = catOpt.orElseGet(() -> categoryService.addCategory(new Category(categoryName)));
                item.setCategory(category);
            }

            // Handle images: save first image and set imageUrl
            if (images != null && images.length > 0) {
                MultipartFile file = images[0];
                if (!file.isEmpty()) {
                    String original = StringUtils.cleanPath(file.getOriginalFilename());
                    String filename = System.currentTimeMillis() + "_" + original;
                    Path uploadDir = Paths.get("uploads");
                    Files.createDirectories(uploadDir);
                    Path target = uploadDir.resolve(filename);
                    Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

                    String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                            .path("/uploads/")
                            .path(filename)
                            .toUriString();
                    item.setImageUrl(fileUri);
                }
            }

            Item savedItem = itemService.addItem(item);
            return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Accept JSON body for simple product creation (no file upload)
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Item> addItemJson(@RequestBody Map<String, Object> body) {
        String name = (String) body.getOrDefault("name", "");
        String categoryName = (String) body.getOrDefault("category", null);
        Double price = 0.0;
        try {
            Object p = body.get("price");
            if (p != null) price = Double.valueOf(p.toString());
        } catch (Exception ignored) {}
        String description = (String) body.getOrDefault("description", "");

        Item item = new Item();
        item.setName(name);
        item.setDescription(description);
        item.setPrice(price);

        if (categoryName != null && !categoryName.isEmpty()) {
            Optional<Category> catOpt = categoryService.findByName(categoryName);
            Category category = catOpt.orElseGet(() -> categoryService.addCategory(new Category(categoryName)));
            item.setCategory(category);
        }

        Item saved = itemService.addItem(item);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // Upload images for an existing item
    @PostMapping(value = "/{id}/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Item> uploadImagesForItem(@PathVariable Long id,
                                                    @RequestPart(value = "images", required = false) MultipartFile[] images) {
        try {
            Item updated = itemService.addImageForItem(id, images);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public Item updateItem(@PathVariable Long id, @RequestBody Item itemDetails) {
        // Handle logic to update item, including re-associating Category if needed
        return itemService.updateItem(id, itemDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        return itemService.getItemById(id)
                .map(item -> ResponseEntity.ok(item))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}