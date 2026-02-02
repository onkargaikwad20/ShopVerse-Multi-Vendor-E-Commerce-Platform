package com.example.productService.Controller;

import com.example.productService.Entity.Category; 
import com.example.productService.Service.CategoryService;
import com.example.productService.Dto.CategoryDto;
import com.example.productService.Dto.ApiResponse;
import jakarta.validation.Valid; 
import lombok.RequiredArgsConstructor; 
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List; 
import java.util.stream.Collectors; 
@RestController
@RequestMapping("/api/category") 
@RequiredArgsConstructor
public class CategoryController
{
	
	private final CategoryService service; 
	@PostMapping("/add")
	public ResponseEntity<?> create(@Valid @RequestBody CategoryDto dto)
	{
		Category c = Category.builder().name(dto.getName()).description(dto.getDescription()).build();
		Category saved = service.create(c); 
		return ResponseEntity.ok(new ApiResponse(true, "Category created: " + saved.getId())); 
		}
	@PutMapping("/{id}") public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody CategoryDto dto) 
	{
		Category c = Category.builder().name(dto.getName()).description(dto.getDescription()).build();
		Category updated = service.update(id, c);
		return ResponseEntity.ok(new ApiResponse(true, "Category updated: " + updated.getId()));
		}
	@DeleteMapping("/{id}") public ResponseEntity<?> delete(@PathVariable Long id)
	{
		service.delete(id);
		return ResponseEntity.ok(new ApiResponse(true, "Deleted"));
		}
	
	
	
	@GetMapping("/all")
	public ResponseEntity<List<CategoryDto>> getAllCategories() {
	    List<CategoryDto> categories = service.list()
	            .stream()
	            .map(c -> {
	                CategoryDto dto = new CategoryDto();
	                dto.setId(c.getId());
	                dto.setName(c.getName());
	                dto.setDescription(c.getDescription());
	                return dto;
	            })
	            .collect(Collectors.toList());

	    return ResponseEntity.ok(categories);
	}

	@GetMapping("/{id}")
	public ResponseEntity<CategoryDto> getById(@PathVariable Long id) {
	    Category c = service.find(id); // fetch category or throw NotFoundException
	    CategoryDto dto = new CategoryDto();
	    dto.setId(c.getId());
	    dto.setName(c.getName());
	    dto.setDescription(c.getDescription());
	    return ResponseEntity.ok(dto);
	}

	
		}