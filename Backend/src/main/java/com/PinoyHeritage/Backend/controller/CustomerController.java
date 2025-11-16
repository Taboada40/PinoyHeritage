package com.PinoyHeritage.Backend.controller;

import com.PinoyHeritage.Backend.entity.Customer;
import com.PinoyHeritage.Backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = "http://localhost:5173") // your frontend dev server
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    // Sign Up
    @PostMapping("/signup")
    public Customer signup(@RequestBody Customer customer) {
        return customerService.registerCustomer(customer);
    }

    // Login
    @PostMapping("/login")
    public Customer login(@RequestBody Customer loginData) {
        Customer customer = customerService.loginCustomer(loginData.getEmail(), loginData.getPassword());
        if (customer == null) {
            throw new RuntimeException("Invalid credentials");
        }
        return customer;
    }
}
