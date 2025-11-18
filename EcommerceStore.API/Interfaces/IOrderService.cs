using EcommerceStore.API.DTOs;

namespace EcommerceStore.API.Interfaces;

public interface IOrderService
{
    Task<IEnumerable<OrderListDto>> GetUserOrdersAsync(int userId);
    Task<OrderDto?> GetOrderByIdAsync(int orderId, int userId);
    Task<OrderDto> CreateOrderAsync(int userId, CreateOrderDto createOrderDto);
    Task<OrderDto?> UpdateOrderStatusAsync(int orderId, UpdateOrderStatusDto updateOrderStatusDto);
    Task<IEnumerable<OrderListDto>> GetAllOrdersAsync();
}
