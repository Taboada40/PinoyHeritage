package com.PinoyHeritage.Backend.service;

import com.PinoyHeritage.Backend.entity.Item;
import com.PinoyHeritage.Backend.entity.Category;
import com.PinoyHeritage.Backend.repository.ItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
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

    // Simple save
    public Item addItem(Item item) {
        return itemRepository.save(item);
    }

    // Transactional save that handles saving the uploaded image to disk and
    // guarantees DB save; if DB save fails, the uploaded file will be deleted.
    @Transactional
    public Item addItemWithImage(Item item, MultipartFile[] images) throws IOException {
        Path uploadDir = Paths.get("uploads");
        Files.createDirectories(uploadDir);

        String filename = null;
        boolean fileSaved = false;

        if (images != null && images.length > 0 && !images[0].isEmpty()) {
            MultipartFile file = images[0];
            String original = StringUtils.cleanPath(file.getOriginalFilename());
            filename = System.currentTimeMillis() + "_" + original;
            Path target = uploadDir.resolve(filename);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            // Use relative uploads path; frontend requests will be proxied to backend
            item.setImageUrl("/uploads/" + filename);
            fileSaved = true;
        }

        try {
            return itemRepository.save(item);
        } catch (RuntimeException ex) {
            // If DB save failed, remove uploaded file to avoid orphan files
            if (fileSaved && filename != null) {
                try {
                    Files.deleteIfExists(uploadDir.resolve(filename));
                } catch (IOException ignored) {
                }
            }
            throw ex;
        }
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

    // Save image(s) for an existing item and update imageUrl (uses first image)
    public Item addImageForItem(Long itemId, MultipartFile[] images) throws IOException {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + itemId));

        if (images != null && images.length > 0 && !images[0].isEmpty()) {
            Path uploadDir = Paths.get("uploads");
            Files.createDirectories(uploadDir);

            MultipartFile file = images[0];
            String original = StringUtils.cleanPath(file.getOriginalFilename());
            String filename = System.currentTimeMillis() + "_" + original;
            Path target = uploadDir.resolve(filename);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

            // Set the imageUrl to the uploads path
            item.setImageUrl("/uploads/" + filename);
            return itemRepository.save(item);
        }

        return item;
    }
}