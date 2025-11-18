using System.ComponentModel.DataAnnotations;

namespace EcommerceStore.API.DTOs;

public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public decimal? CompareAtPrice { get; set; }
    public int StockQuantity { get; set; }
    public string? SKU { get; set; }
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public string? MainImageUrl { get; set; }
    public bool IsFeatured { get; set; }
    public bool IsActive { get; set; }
    public double AverageRating { get; set; }
    public int ReviewCount { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<ProductImageDto> Images { get; set; } = new();
}

public class ProductListDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public decimal? CompareAtPrice { get; set; }
    public int StockQuantity { get; set; }
    public string? MainImageUrl { get; set; }
    public bool IsFeatured { get; set; }
    public double AverageRating { get; set; }
    public int ReviewCount { get; set; }
    public string CategoryName { get; set; } = string.Empty;
}

public class CreateProductDto
{
    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string? Description { get; set; }

    [Required]
    [Range(0.01, double.MaxValue)]
    public decimal Price { get; set; }

    public decimal? CompareAtPrice { get; set; }

    [Required]
    [Range(0, int.MaxValue)]
    public int StockQuantity { get; set; }

    public string? SKU { get; set; }

    [Required]
    public int CategoryId { get; set; }

    public string? MainImageUrl { get; set; }

    public bool IsFeatured { get; set; }
}

public class UpdateProductDto
{
    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string? Description { get; set; }

    [Required]
    [Range(0.01, double.MaxValue)]
    public decimal Price { get; set; }

    public decimal? CompareAtPrice { get; set; }

    [Required]
    [Range(0, int.MaxValue)]
    public int StockQuantity { get; set; }

    public string? SKU { get; set; }

    [Required]
    public int CategoryId { get; set; }

    public string? MainImageUrl { get; set; }

    public bool IsFeatured { get; set; }

    public bool IsActive { get; set; }
}

public class ProductImageDto
{
    public int Id { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
}
