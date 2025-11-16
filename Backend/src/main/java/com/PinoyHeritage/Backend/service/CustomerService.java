package com.PinoyHeritage.Backend.service;

import com.PinoyHeritage.Backend.entity.Customer;
import com.PinoyHeritage.Backend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public Customer registerCustomer(Customer customer) {
        // Ideally hash password here
        return customerRepository.save(customer);
    }

    public Customer loginCustomer(String email, String password) {
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if (customerOpt.isPresent()) {
            Customer customer = customerOpt.get();
            if (customer.getPassword().equals(password)) {
                return customer;
            }
        }
        return null; // invalid login
    }
}
