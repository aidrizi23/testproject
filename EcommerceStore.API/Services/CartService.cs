using AutoMapper;
using Microsoft.EntityFrameworkCore;
using EcommerceStore.API.Data;
using EcommerceStore.API.DTOs;
using EcommerceStore.API.Interfaces;
using EcommerceStore.API.Models;

namespace EcommerceStore.API.Services;

public class CartService : ICartService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public CartService(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<CartDto> GetCartAsync(int userId)
    {
        var cart = await _context.Carts
            .Include(c => c.CartItems)
            .ThenInclude(ci => ci.Product)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart == null)
        {
            // Create cart if it doesn't exist
            cart = new Cart
            {
                UserId = userId,
                CreatedAt = DateTime.UtcNow
            };
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }

        return _mapper.Map<CartDto>(cart);
    }

    public async Task<CartDto> AddToCartAsync(int userId, AddToCartDto addToCartDto)
    {
        var cart = await _context.Carts
            .Include(c => c.CartItems)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart == null)
        {
            cart = new Cart
            {
                UserId = userId,
                CreatedAt = DateTime.UtcNow
            };
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }

        // Check if product exists
        var product = await _context.Products.FindAsync(addToCartDto.ProductId);
        if (product == null || !product.IsActive)
        {
            throw new KeyNotFoundException("Product not found");
        }

        // Check stock
        if (product.StockQuantity < addToCartDto.Quantity)
        {
            throw new InvalidOperationException("Insufficient stock");
        }

        // Check if item already in cart
        var existingItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == addToCartDto.ProductId);

        if (existingItem != null)
        {
            existingItem.Quantity += addToCartDto.Quantity;
            existingItem.UpdatedAt = DateTime.UtcNow;
        }
        else
        {
            var cartItem = new CartItem
            {
                CartId = cart.Id,
                ProductId = addToCartDto.ProductId,
                Quantity = addToCartDto.Quantity,
                CreatedAt = DateTime.UtcNow
            };
            _context.CartItems.Add(cartItem);
        }

        cart.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return await GetCartAsync(userId);
    }

    public async Task<CartDto> UpdateCartItemAsync(int userId, int cartItemId, UpdateCartItemDto updateCartItemDto)
    {
        var cart = await _context.Carts
            .Include(c => c.CartItems)
            .ThenInclude(ci => ci.Product)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart == null)
        {
            throw new KeyNotFoundException("Cart not found");
        }

        var cartItem = cart.CartItems.FirstOrDefault(ci => ci.Id == cartItemId);

        if (cartItem == null)
        {
            throw new KeyNotFoundException("Cart item not found");
        }

        // Check stock
        if (cartItem.Product.StockQuantity < updateCartItemDto.Quantity)
        {
            throw new InvalidOperationException("Insufficient stock");
        }

        cartItem.Quantity = updateCartItemDto.Quantity;
        cartItem.UpdatedAt = DateTime.UtcNow;
        cart.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return await GetCartAsync(userId);
    }

    public async Task<CartDto> RemoveFromCartAsync(int userId, int cartItemId)
    {
        var cart = await _context.Carts
            .Include(c => c.CartItems)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart == null)
        {
            throw new KeyNotFoundException("Cart not found");
        }

        var cartItem = cart.CartItems.FirstOrDefault(ci => ci.Id == cartItemId);

        if (cartItem == null)
        {
            throw new KeyNotFoundException("Cart item not found");
        }

        _context.CartItems.Remove(cartItem);
        cart.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return await GetCartAsync(userId);
    }

    public async Task<bool> ClearCartAsync(int userId)
    {
        var cart = await _context.Carts
            .Include(c => c.CartItems)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart == null)
        {
            return false;
        }

        _context.CartItems.RemoveRange(cart.CartItems);
        cart.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return true;
    }
}
