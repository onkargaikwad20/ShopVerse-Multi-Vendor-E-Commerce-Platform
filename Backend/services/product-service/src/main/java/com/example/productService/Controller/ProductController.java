package com.example.productService.Controller;

import com.example.productService.Dto.ApiResponse;
import com.example.productService.Dto.ProductDto;
import com.example.productService.Entity.Product;
import com.example.productService.Service.ProductService;
import com.shopverse.common.exceptions.ApiException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

	private final ProductService service;

	// ---------- MAPPERS ----------
	private Product toEntity(ProductDto d) {
		return Product.builder()
				.id(d.getId())
				.name(d.getName())
				.description(d.getDescription())
				.price(d.getPrice())
				.quantity(d.getQuantity())
				.images(d.getImages())
				.sellerId(d.getSellerId())
				.shopId(d.getShopId())
				.category(d.getCategory())
				.build();
	}

	private ProductDto toDto(Product p) {
		ProductDto d = new ProductDto();
		d.setId(p.getId());
		d.setName(p.getName());
		d.setDescription(p.getDescription());
		d.setPrice(p.getPrice());
		d.setQuantity(p.getQuantity());
		d.setImages(p.getImages());
		d.setSellerId(p.getSellerId());
		d.setShopId(p.getShopId());
		d.setCategory(p.getCategory());
		return d;
	}

	// ---------- CREATE ----------
	@PostMapping("/add")
	public ResponseEntity<ApiResponse> create(
			@Valid @RequestBody ProductDto dto,
			Authentication auth) {
		if (auth == null || auth.getAuthorities().stream()
				.noneMatch(a -> a.getAuthority().equals("ROLE_SELLER"))) {
			throw new ApiException("FORBIDDEN", "Only sellers can create products");
		}

		Product saved = service.create(toEntity(dto));
		return ResponseEntity.ok(
				new ApiResponse(true, "Product created with id: " + saved.getId()));
	}

	// ---------- UPDATE ----------
	@PutMapping("/{id}")
	public ResponseEntity<ApiResponse> update(
			@PathVariable Long id,
			@Valid @RequestBody ProductDto dto,
			Authentication auth) {
		if (auth == null || auth.getAuthorities().stream()
				.noneMatch(a -> a.getAuthority().equals("ROLE_SELLER"))) {
			throw new ApiException("FORBIDDEN", "Only sellers can update products");
		}

		Product updated = service.update(id, toEntity(dto));
		return ResponseEntity.ok(
				new ApiResponse(true, "Product updated with id: " + updated.getId()));
	}

	// ---------- DELETE (SOFT) ----------
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> delete(
			@PathVariable Long id,
			Authentication auth) {
		if (auth == null || auth.getAuthorities().stream()
				.noneMatch(a -> a.getAuthority().equals("ROLE_SELLER"))) {
			throw new ApiException("FORBIDDEN", "Only sellers can delete products");
		}

		service.delete(id);
		return ResponseEntity.ok(
				new ApiResponse(true, "Product soft-deleted successfully"));
	}

	// ---------- READ ----------
	@GetMapping("/{id}")
	public ResponseEntity<ProductDto> getById(@PathVariable Long id) {
		return ResponseEntity.ok(toDto(service.getById(id)));
	}

	@GetMapping
	public ResponseEntity<List<ProductDto>> listAll() {
		return ResponseEntity.ok(
				service.listAll()
						.stream()
						.map(this::toDto)
						.collect(Collectors.toList()));
	}

	@GetMapping("/seller/{sellerId}")
	public ResponseEntity<List<ProductDto>> listBySeller(@PathVariable Long sellerId) {
		return ResponseEntity.ok(
				service.listBySeller(sellerId)
						.stream()
						.map(this::toDto)
						.collect(Collectors.toList()));
	}

	@GetMapping("/category/{category}")
	public ResponseEntity<List<ProductDto>> listByCategory(@PathVariable String category) {
		return ResponseEntity.ok(
				service.listByCategory(category)
						.stream()
						.map(this::toDto)
						.collect(Collectors.toList()));
	}

	@PutMapping("/{id}/reduce-stock")
	public ResponseEntity<ApiResponse> reduceStock(
			@PathVariable Long id,
			@RequestParam Integer quantity) {
		service.reduceStock(id, quantity);
		return ResponseEntity.ok(
				new ApiResponse(true, "Stock reduced successfully"));
	}
}
