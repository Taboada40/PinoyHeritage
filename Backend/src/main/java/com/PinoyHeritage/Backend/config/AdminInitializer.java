package com.PinoyHeritage.Backend.config;

import com.PinoyHeritage.Backend.entity.Customer;
import com.PinoyHeritage.Backend.repository.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {

    private final CustomerRepository customerRepository;

    public AdminInitializer(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        String adminEmail = "admin@pinoyheritage.com";

        customerRepository.findByEmail(adminEmail).ifPresentOrElse(existing -> {
            existing.setUsername("admin");
            existing.setPassword("admin12345");
            customerRepository.save(existing);
        }, () -> {
            Customer admin = new Customer();
            admin.setUsername("admin");
            admin.setEmail(adminEmail);
            admin.setPassword("admin12345");
            customerRepository.save(admin);
        });
    }
}
