using AutoMapper;
using Microsoft.EntityFrameworkCore;
using EcommerceStore.API.Data;
using EcommerceStore.API.DTOs;
using EcommerceStore.API.Interfaces;
using EcommerceStore.API.Models;

namespace EcommerceStore.API.Services;

public class CategoryService : ICategoryService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public CategoryService(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync()
    {
        var categories = await _context.Categories
            .Include(c => c.SubCategories)
            .Include(c => c.Products)
            .Where(c => c.IsActive && c.ParentCategoryId == null)
            .OrderBy(c => c.Name)
            .ToListAsync();

        return _mapper.Map<IEnumerable<CategoryDto>>(categories);
    }

    public async Task<CategoryDto?> GetCategoryByIdAsync(int id)
    {
        var category = await _context.Categories
            .Include(c => c.SubCategories)
            .Include(c => c.Products)
            .FirstOrDefaultAsync(c => c.Id == id);

        return category == null ? null : _mapper.Map<CategoryDto>(category);
    }

    public async Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto createCategoryDto)
    {
        var category = _mapper.Map<Category>(createCategoryDto);
        category.CreatedAt = DateTime.UtcNow;

        _context.Categories.Add(category);
        await _context.SaveChangesAsync();

        return _mapper.Map<CategoryDto>(await _context.Categories
            .Include(c => c.SubCategories)
            .Include(c => c.Products)
            .FirstAsync(c => c.Id == category.Id));
    }

    public async Task<CategoryDto?> UpdateCategoryAsync(int id, UpdateCategoryDto updateCategoryDto)
    {
        var category = await _context.Categories.FindAsync(id);

        if (category == null)
        {
            return null;
        }

        _mapper.Map(updateCategoryDto, category);

        await _context.SaveChangesAsync();

        return _mapper.Map<CategoryDto>(await _context.Categories
            .Include(c => c.SubCategories)
            .Include(c => c.Products)
            .FirstAsync(c => c.Id == category.Id));
    }

    public async Task<bool> DeleteCategoryAsync(int id)
    {
        var category = await _context.Categories.FindAsync(id);

        if (category == null)
        {
            return false;
        }

        category.IsActive = false;

        await _context.SaveChangesAsync();
        return true;
    }
}
