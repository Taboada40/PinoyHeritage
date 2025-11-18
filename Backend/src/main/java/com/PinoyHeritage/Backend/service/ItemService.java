package com.PinoyHeritage.Backend.service;

import com.PinoyHeritage.Backend.entity.Item;
import com.PinoyHeritage.Backend.entity.Category;
import com.PinoyHeritage.Backend.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final CategoryService categoryService; // Used to find the Category by name

    public ItemService(ItemRepository itemRepository, CategoryService categoryService) {
        this.itemRepository = itemRepository;
        this.categoryService = categoryService;
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Optional<Item> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    // ⭐ NOTE: This method assumes the controller will handle finding the Category 
    // or the DTO mapping. For simplicity, we'll keep it focused on saving the Item.
    public Item addItem(Item item) {
        return itemRepository.save(item);
    }

    public Item updateItem(Long id, Item updatedItem) {
        return itemRepository.findById(id)
                .map(item -> {
                    item.setName(updatedItem.getName());
                    item.setDescription(updatedItem.getDescription());
                    item.setPrice(updatedItem.getPrice());
                    
                    // You would need to handle category updates here as well.
                    // If updatedItem has a Category object set, update it.
                    if (updatedItem.getCategory() != null) {
                        item.setCategory(updatedItem.getCategory());
                    }

                    return itemRepository.save(item);
                })
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + id));
    }

    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }
}