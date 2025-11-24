package com.PinoyHeritage.Backend.service;

import com.PinoyHeritage.Backend.entity.Category;
import com.PinoyHeritage.Backend.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository repository;

    public CategoryService(CategoryRepository repository) {
        this.repository = repository;
    }

    public List<Category> getAllCategories() {
        return repository.findAll();
    }

    public Optional<Category> getCategoryById(Long id) {
        return repository.findById(id);
    }

    public Category addCategory(Category category) {
        return repository.save(category);
    }

    public Category updateCategory(Long id, Category updatedCategory) {
        return repository.findById(id)
                .map(category -> {
                    category.setName(updatedCategory.getName());
                    return repository.save(category);
                })
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    public void deleteCategory(Long id) {
        repository.deleteById(id);
    }

    // New helper: find by name
    public java.util.Optional<Category> findByName(String name) {
        return repository.findByName(name);
    }

}
