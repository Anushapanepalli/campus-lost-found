package com.example.campus_lost_found.repository;

import com.example.campus_lost_found.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
