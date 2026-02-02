package com.example.productService.repository;

import com.example.productService.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
	List<Product> findBySellerIdAndDeletedAtIsNull(Long sellerId);

	List<Product> findByCategoryAndDeletedAtIsNull(String category);

	List<Product> findByDeletedAtIsNull();

	// New validation methods
	List<Product> findByVerificationStatusAndDeletedAtIsNull(
			com.example.productService.Entity.VerificationStatus status);

	@Query("SELECT p FROM Product p WHERE p.id = :id AND p.deletedAt IS NULL")
	Optional<Product> findActiveById(@Param("id") Long id);

}
