package com.PinoyHeritage.Backend.controller;

import com.PinoyHeritage.Backend.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth") // General authentication path
@CrossOrigin(origins = "http://localhost:5173") 
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // ⭐ New Endpoint for Admin Login Check
    @PostMapping("/admin-login")
    public ResponseEntity<?> adminLogin(@RequestBody AdminLoginRequest request) {
        
        // Use the AdminService to check credentials
        if (adminService.authenticate(request.getUsername(), request.getPassword())) {
            // Success: Return a token or simple success object
            return ResponseEntity.ok("{\"role\": \"ADMIN\"}");
        } else {
            // Failure
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
    
    // Simple record/class to hold request body fields
    public static class AdminLoginRequest {
        private String username;
        private String password;
        
        // Getters and Setters (required for Jackson deserialization)
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}