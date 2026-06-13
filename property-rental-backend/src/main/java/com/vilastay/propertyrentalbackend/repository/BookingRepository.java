package com.vilastay.propertyrentalbackend.repository;

import com.vilastay.propertyrentalbackend.entity.Booking;
import com.vilastay.propertyrentalbackend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);
    Page<Booking> findByUser(User user, Pageable pageable);
    List<Booking> findByPropertyId(Long propertyId);
    long countByStatus(String status);

    @Query("SELECT COALESCE(SUM(b.totalPrice), 0) FROM Booking b WHERE b.status = 'CONFIRMED'")
    long getTotalRevenue();

    @Query("SELECT COUNT(b) FROM Booking b WHERE MONTH(b.createdAt) = MONTH(CURRENT_DATE) AND YEAR(b.createdAt) = YEAR(CURRENT_DATE)")
    long getMonthlyBookingsCount();

    @Query("SELECT COALESCE(SUM(b.totalPrice), 0) FROM Booking b WHERE MONTH(b.createdAt) = MONTH(CURRENT_DATE) AND YEAR(b.createdAt) = YEAR(CURRENT_DATE) AND b.status = 'CONFIRMED'")
    long getMonthlyRevenue();
}