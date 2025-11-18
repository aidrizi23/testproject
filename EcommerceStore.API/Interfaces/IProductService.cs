using EcommerceStore.API.DTOs;

namespace EcommerceStore.API.Interfaces;

public interface IProductService
{
    Task<IEnumerable<ProductListDto>> GetAllProductsAsync(string? search = null, int? categoryId = null, decimal? minPrice = null, decimal? maxPrice = null, string? sortBy = null);
    Task<ProductDto?> GetProductByIdAsync(int id);
    Task<ProductDto> CreateProductAsync(CreateProductDto createProductDto);
    Task<ProductDto?> UpdateProductAsync(int id, UpdateProductDto updateProductDto);
    Task<bool> DeleteProductAsync(int id);
    Task<IEnumerable<ProductListDto>> GetFeaturedProductsAsync();
}
