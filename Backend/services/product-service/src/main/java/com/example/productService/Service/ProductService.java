package com.example.productService.Service;

import com.example.productService.Entity.Product;
import com.example.productService.repository.ProductRepository;
import com.shopverse.common.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProductService {

	private final ProductRepository repo;

	public Product create(Product product) {
		product.setCreatedAt(Instant.now());
		product.setUpdatedAt(Instant.now());
		product.setDeletedAt(null);
		product.setVerificationStatus(com.example.productService.Entity.VerificationStatus.PENDING);
		return repo.save(product);
	}

	public Product update(Long id, Product updated) {
		Product existing = getActiveProduct(id);

		existing.setName(updated.getName());
		existing.setDescription(updated.getDescription());
		existing.setPrice(updated.getPrice());
		existing.setQuantity(updated.getQuantity());
		existing.setImages(updated.getImages());
		existing.setCategory(updated.getCategory());
		existing.setShopId(updated.getShopId());
		existing.setSellerId(updated.getSellerId());
		// Do not update status here unless we want to reset to PENDING on edit
		// (recommended for moderation)
		// existing.setVerificationStatus(com.example.productService.Entity.VerificationStatus.PENDING);
		existing.setUpdatedAt(Instant.now());

		return repo.save(existing);
	}

	/**
	 * Soft delete product
	 */
	public void delete(Long id) {
		Product existing = getActiveProduct(id);
		existing.setDeletedAt(Instant.now());
		repo.save(existing);
	}

	public Product getById(Long id) {
		return getActiveProduct(id);
	}

	// Public list - Approved only
	public List<Product> listAll() {
		return repo.findByVerificationStatusAndDeletedAtIsNull(
				com.example.productService.Entity.VerificationStatus.APPROVED);
	}

	public List<Product> listBySeller(Long sellerId) {
		return repo.findBySellerIdAndDeletedAtIsNull(sellerId);
	}

	// Admin methods
	public List<Product> getPendingProducts() {
		return repo.findByVerificationStatusAndDeletedAtIsNull(
				com.example.productService.Entity.VerificationStatus.PENDING);
	}

	public Product verifyProduct(Long id, com.example.productService.Entity.VerificationStatus status) {
		Product product = getActiveProduct(id);
		product.setVerificationStatus(status);
		product.setUpdatedAt(Instant.now());
		return repo.save(product);
	}

	public List<Product> listByCategory(String category) {
		return repo.findByCategoryAndDeletedAtIsNull(category);
	}

	/**
	 * Centralized active-product check
	 */
	private Product getActiveProduct(Long id) {
		Product product = repo.findById(id)
				.orElseThrow(() -> new NotFoundException("Product not found with id: " + id));

		if (product.getDeletedAt() != null) {
			throw new NotFoundException("Product not found with id: " + id);
		}

		return product;
	}

	@Transactional
	public void reduceStock(Long id, Integer quantity) {
		System.out.println("Processing stock reduction in SERVICE for Product ID: " + id + ", Quantity: " + quantity);
		Product product = getActiveProduct(id);
		System.out.println("Current Stock before reduction: " + product.getQuantity());

		if (product.getQuantity() < quantity) {
			System.out.println("Insufficient stock! Available: " + product.getQuantity() + ", Requested: " + quantity);
			throw new com.shopverse.common.exceptions.ApiException("BAD_REQUEST", "Insufficient stock for product: "
					+ product.getName() + " (Available: " + product.getQuantity() + ")");
		}
		product.setQuantity(product.getQuantity() - quantity);
		product.setUpdatedAt(Instant.now());
		repo.saveAndFlush(product);
		System.out.println("Stock reduced successfully. New Stock: " + product.getQuantity());
	}
}
