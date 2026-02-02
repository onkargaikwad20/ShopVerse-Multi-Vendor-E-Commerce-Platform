package com.example.productService.Service;

import com.example.productService.Entity.Category;
import com.example.productService.repository.CategoryRepository;
import com.shopverse.common.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

	private final CategoryRepository repo;

	public Category create(Category category) {
		return repo.save(category);
	}

	public Category update(Long id, Category updated) {
		Category existing = repo.findById(id)
				.orElseThrow(() -> new NotFoundException("Category not found with id: " + id));

		existing.setName(updated.getName());
		existing.setDescription(updated.getDescription());

		return repo.save(existing);
	}

	public void delete(Long id) {
		Category existing = repo.findById(id)
				.orElseThrow(() -> new NotFoundException("Category not found with id: " + id));

		repo.delete(existing);
	}

	public Category find(Long id) {
		return repo.findById(id)
				.orElseThrow(() -> new NotFoundException("Category not found with id: " + id));
	}

	public List<Category> list() {
		return repo.findAll();
	}
}
