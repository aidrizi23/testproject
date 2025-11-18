using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceStore.API.Models;

public class Order
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    [Required]
    [MaxLength(50)]
    public string OrderNumber { get; set; } = string.Empty;

    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal SubTotal { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal Tax { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal ShippingCost { get; set; }

    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal TotalAmount { get; set; }

    [Required]
    [MaxLength(50)]
    public string Status { get; set; } = "Pending"; // Pending, Processing, Shipped, Delivered, Cancelled

    [MaxLength(50)]
    public string PaymentStatus { get; set; } = "Pending"; // Pending, Paid, Failed, Refunded

    [MaxLength(50)]
    public string PaymentMethod { get; set; } = "CreditCard";

    public int? ShippingAddressId { get; set; }

    public int? BillingAddressId { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeliveredAt { get; set; }

    [MaxLength(1000)]
    public string? Notes { get; set; }

    // Navigation properties
    public virtual User User { get; set; } = null!;
    public virtual Address? ShippingAddress { get; set; }
    public virtual Address? BillingAddress { get; set; }
    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
