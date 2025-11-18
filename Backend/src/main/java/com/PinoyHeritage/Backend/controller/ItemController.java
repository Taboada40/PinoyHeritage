package com.PinoyHeritage.Backend.controller;

import com.PinoyHeritage.Backend.entity.Item;
import com.PinoyHeritage.Backend.entity.Category;
import com.PinoyHeritage.Backend.service.ItemService;
import com.PinoyHeritage.Backend.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/products") // Matches the endpoint in AdminCategories.jsx
@CrossOrigin(origins = "http://localhost:5173") // React dev server
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

    @PostMapping
    public ResponseEntity<Item> addItem(@RequestBody Item newItem) {
        // Your React component sends 'category' as a String name (e.g., "Clothing")
        // We must map that name to the actual Category entity before saving the Item.

        // ⚠️ IMPROVEMENT REQUIRED: Category entity search by Name.
        // Since CategoryRepository doesn't have a findByName yet, we'll use a placeholder logic.
        // For now, this is simplified. For production, you must implement findByName in CategoryRepository.
        
        // --- TEMPORARY FIX: Assume newItem's category is already set correctly if ID is used ---
        // For the sake of saving, we will rely on the Category entity being provided in the DTO/JSON.
        
        Item savedItem = itemService.addItem(newItem);
        return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
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
}