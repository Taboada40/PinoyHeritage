package com.PinoyHeritage.Backend.service;

import com.PinoyHeritage.Backend.entity.Admin;
import com.PinoyHeritage.Backend.repository.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    /**
     * Attempts to find an Admin by username and checks the password.
     * ⚠️ WARNING: In a real application, the password MUST be hashed (e.g., using BCryptPasswordEncoder).
     * Since you are manually inserting 'admin123' without hashing, this check is simple string comparison.
     * * @param username The username provided by the user.
     * @param password The raw password provided by the user.
     * @return true if credentials match, false otherwise.
     */
    public boolean authenticate(String username, String password) {
        Optional<Admin> adminOptional = adminRepository.findByUsername(username);

        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            // Simple string comparison (NOT secure, but matches the current plaintext setup)
            return admin.getPassword().equals(password); 
        }
        return false;
    }
}