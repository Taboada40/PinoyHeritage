package com.PinoyHeritage.Backend.repository;

import com.PinoyHeritage.Backend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByCustomerIdOrderByCreatedAtDesc(Long customerId);
    long countByCustomerIdAndReadFalse(Long customerId);
}
