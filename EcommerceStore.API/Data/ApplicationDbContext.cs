using Microsoft.EntityFrameworkCore;
using EcommerceStore.API.Models;

namespace EcommerceStore.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<ProductImage> ProductImages { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<CartItem> CartItems { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<Address> Addresses { get; set; }
    public DbSet<Review> Reviews { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User configuration
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(e => e.Email).IsUnique();
            entity.HasOne(u => u.Cart)
                .WithOne(c => c.User)
                .HasForeignKey<Cart>(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Product configuration
        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasIndex(e => e.SKU).IsUnique();
            entity.Property(e => e.Price).HasPrecision(18, 2);
            entity.Property(e => e.CompareAtPrice).HasPrecision(18, 2);
        });

        // Order configuration
        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasIndex(e => e.OrderNumber).IsUnique();
            entity.Property(e => e.SubTotal).HasPrecision(18, 2);
            entity.Property(e => e.Tax).HasPrecision(18, 2);
            entity.Property(e => e.ShippingCost).HasPrecision(18, 2);
            entity.Property(e => e.TotalAmount).HasPrecision(18, 2);

            entity.HasOne(o => o.ShippingAddress)
                .WithMany()
                .HasForeignKey(o => o.ShippingAddressId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(o => o.BillingAddress)
                .WithMany()
                .HasForeignKey(o => o.BillingAddressId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // OrderItem configuration
        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.Property(e => e.UnitPrice).HasPrecision(18, 2);
            entity.Property(e => e.TotalPrice).HasPrecision(18, 2);
        });

        // Category self-referencing relationship
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasOne(c => c.ParentCategory)
                .WithMany(c => c.SubCategories)
                .HasForeignKey(c => c.ParentCategoryId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Seed initial data
        SeedData(modelBuilder);
    }

    private void SeedData(ModelBuilder modelBuilder)
    {
        // Seed Categories
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Electronics", Description = "Electronic devices and accessories", IsActive = true },
            new Category { Id = 2, Name = "Clothing", Description = "Men's and Women's clothing", IsActive = true },
            new Category { Id = 3, Name = "Home & Garden", Description = "Home decor and garden supplies", IsActive = true },
            new Category { Id = 4, Name = "Sports & Outdoors", Description = "Sports equipment and outdoor gear", IsActive = true },
            new Category { Id = 5, Name = "Books", Description = "Books and ebooks", IsActive = true }
        );

        // Seed an admin user (password: Admin123!)
        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                FirstName = "Admin",
                LastName = "User",
                Email = "admin@ecommerce.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!"),
                IsAdmin = true,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            }
        );

        // Seed sample products
        modelBuilder.Entity<Product>().HasData(
            new Product
            {
                Id = 1,
                Name = "Wireless Headphones",
                Description = "High-quality wireless headphones with noise cancellation",
                Price = 199.99m,
                CompareAtPrice = 249.99m,
                StockQuantity = 50,
                SKU = "WH-001",
                CategoryId = 1,
                MainImageUrl = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
                IsFeatured = true,
                IsActive = true,
                AverageRating = 4.5,
                ReviewCount = 120
            },
            new Product
            {
                Id = 2,
                Name = "Smart Watch",
                Description = "Feature-rich smartwatch with fitness tracking",
                Price = 299.99m,
                CompareAtPrice = 349.99m,
                StockQuantity = 30,
                SKU = "SW-002",
                CategoryId = 1,
                MainImageUrl = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
                IsFeatured = true,
                IsActive = true,
                AverageRating = 4.7,
                ReviewCount = 85
            },
            new Product
            {
                Id = 3,
                Name = "Premium T-Shirt",
                Description = "Comfortable cotton t-shirt in various colors",
                Price = 29.99m,
                StockQuantity = 200,
                SKU = "TS-003",
                CategoryId = 2,
                MainImageUrl = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
                IsActive = true,
                AverageRating = 4.3,
                ReviewCount = 45
            },
            new Product
            {
                Id = 4,
                Name = "Running Shoes",
                Description = "Lightweight running shoes with superior cushioning",
                Price = 89.99m,
                CompareAtPrice = 119.99m,
                StockQuantity = 75,
                SKU = "RS-004",
                CategoryId = 4,
                MainImageUrl = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
                IsFeatured = true,
                IsActive = true,
                AverageRating = 4.6,
                ReviewCount = 200
            },
            new Product
            {
                Id = 5,
                Name = "Yoga Mat",
                Description = "Non-slip yoga mat with carrying strap",
                Price = 39.99m,
                StockQuantity = 100,
                SKU = "YM-005",
                CategoryId = 4,
                MainImageUrl = "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
                IsActive = true,
                AverageRating = 4.4,
                ReviewCount = 67
            }
        );
    }
}
