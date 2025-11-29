package com.PinoyHeritage.Backend.service;

import com.PinoyHeritage.Backend.entity.Customer;
import com.PinoyHeritage.Backend.entity.Notification;
import com.PinoyHeritage.Backend.repository.CustomerRepository;
import com.PinoyHeritage.Backend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public Notification createNotification(Long customerId, Long orderId, String message) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Notification n = new Notification();
        n.setCustomer(customer);
        n.setOrderId(orderId);
        n.setMessage(message);
        return notificationRepository.save(n);
    }

    public List<Notification> getNotificationsForCustomer(Long customerId) {
        return notificationRepository.findByCustomerIdOrderByCreatedAtDesc(customerId);
    }

    public long getUnreadCount(Long customerId) {
        return notificationRepository.countByCustomerIdAndReadFalse(customerId);
    }

    public void markAllAsRead(Long customerId) {
        List<Notification> list = notificationRepository.findByCustomerIdOrderByCreatedAtDesc(customerId);
        for (Notification n : list) {
            if (!n.isRead()) {
                n.setRead(true);
            }
        }
        notificationRepository.saveAll(list);
    }

    public void deleteAllForCustomer(Long customerId) {
        List<Notification> list = notificationRepository.findByCustomerIdOrderByCreatedAtDesc(customerId);
        notificationRepository.deleteAll(list);
    }

    public void deleteNotification(Long notificationId) {
        notificationRepository.deleteById(notificationId);
    }
}
