using System.ComponentModel.DataAnnotations;

namespace EcommerceStore.API.Models;

public class ProductImage
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int ProductId { get; set; }

    [Required]
    [MaxLength(255)]
    public string ImageUrl { get; set; } = string.Empty;

    public int DisplayOrder { get; set; } = 0;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual Product Product { get; set; } = null!;
}
