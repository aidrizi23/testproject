using EcommerceStore.API.DTOs;

namespace EcommerceStore.API.Interfaces;

public interface ICartService
{
    Task<CartDto> GetCartAsync(int userId);
    Task<CartDto> AddToCartAsync(int userId, AddToCartDto addToCartDto);
    Task<CartDto> UpdateCartItemAsync(int userId, int cartItemId, UpdateCartItemDto updateCartItemDto);
    Task<CartDto> RemoveFromCartAsync(int userId, int cartItemId);
    Task<bool> ClearCartAsync(int userId);
}
