package com.example.campus_lost_found.controller;

import com.example.campus_lost_found.entity.Item;
import com.example.campus_lost_found.service.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    // Add a new item
    @PostMapping
    public Item addItem(@RequestBody Item item) {
        return itemService.addItem(item);
    }

    // Get all items
    @GetMapping
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    // Get item by ID
    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        return itemService.getItemById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update an existing item
    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(
            @PathVariable Long id,
            @RequestBody Item updatedItem) {

        return itemService.getItemById(id)
                .map(existingItem -> {

                    existingItem.setItemName(updatedItem.getItemName());
                    existingItem.setType(updatedItem.getType());
                    existingItem.setCategory(updatedItem.getCategory());
                    existingItem.setLocation(updatedItem.getLocation());
                    existingItem.setDescription(updatedItem.getDescription());

                    return ResponseEntity.ok(
                            itemService.addItem(existingItem)
                    );
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete item
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }
}
