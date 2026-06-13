package com.vilastay.propertyrentalbackend.repository;

import com.vilastay.propertyrentalbackend.entity.Property;
import com.vilastay.propertyrentalbackend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    Page<Property> findByStatus(String status, Pageable pageable);
    List<Property> findByOwner(User owner);
    Page<Property> findByOwner(User owner, Pageable pageable);
    long countByStatus(String status);
    long countByFeatured(boolean featured);

    @Query("SELECT p FROM Property p WHERE " +
            "(:location IS NULL OR LOWER(p.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
            "(:type IS NULL OR p.type = :type) AND " +
            "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
            "(:maxPrice IS NULL OR p.price <= :maxPrice) AND " +
            "p.status = 'APPROVED'")
    Page<Property> searchProperties(@Param("location") String location,
                                    @Param("type") String type,
                                    @Param("minPrice") Integer minPrice,
                                    @Param("maxPrice") Integer maxPrice,
                                    Pageable pageable);
}