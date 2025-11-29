package com.PinoyHeritage.Backend.controller;

import com.PinoyHeritage.Backend.entity.Notification;
import com.PinoyHeritage.Backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/customer/{customerId}")
    public List<Notification> getNotifications(@PathVariable Long customerId) {
        return notificationService.getNotificationsForCustomer(customerId);
    }

    @GetMapping("/customer/{customerId}/unread-count")
    public Map<String, Long> getUnreadCount(@PathVariable Long customerId) {
        long count = notificationService.getUnreadCount(customerId);
        Map<String, Long> map = new HashMap<>();
        map.put("count", count);
        return map;
    }

    @PostMapping("/customer/{customerId}/mark-all-read")
    public void markAllRead(@PathVariable Long customerId) {
        notificationService.markAllAsRead(customerId);
    }

    @DeleteMapping("/customer/{customerId}")
    public void deleteAllNotifications(@PathVariable Long customerId) {
        notificationService.deleteAllForCustomer(customerId);
    }

    @DeleteMapping("/{notificationId}")
    public void deleteNotification(@PathVariable Long notificationId) {
        notificationService.deleteNotification(notificationId);
    }
}
