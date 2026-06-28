package com.vilastay.propertyrentalbackend.repository;

import com.vilastay.propertyrentalbackend.entity.Payment;
import com.vilastay.propertyrentalbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUserOrderByCreatedAtDesc(User user);
    Optional<Payment> findByTransactionId(String transactionId);
}
