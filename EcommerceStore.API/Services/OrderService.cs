using AutoMapper;
using Microsoft.EntityFrameworkCore;
using EcommerceStore.API.Data;
using EcommerceStore.API.DTOs;
using EcommerceStore.API.Interfaces;
using EcommerceStore.API.Models;

namespace EcommerceStore.API.Services;

public class OrderService : IOrderService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public OrderService(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<OrderListDto>> GetUserOrdersAsync(int userId)
    {
        var orders = await _context.Orders
            .Include(o => o.OrderItems)
            .Where(o => o.UserId == userId)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();

        return _mapper.Map<IEnumerable<OrderListDto>>(orders);
    }

    public async Task<OrderDto?> GetOrderByIdAsync(int orderId, int userId)
    {
        var order = await _context.Orders
            .Include(o => o.OrderItems)
            .Include(o => o.ShippingAddress)
            .Include(o => o.BillingAddress)
            .FirstOrDefaultAsync(o => o.Id == orderId && o.UserId == userId);

        return order == null ? null : _mapper.Map<OrderDto>(order);
    }

    public async Task<OrderDto> CreateOrderAsync(int userId, CreateOrderDto createOrderDto)
    {
        // Get user's cart
        var cart = await _context.Carts
            .Include(c => c.CartItems)
            .ThenInclude(ci => ci.Product)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart == null || !cart.CartItems.Any())
        {
            throw new InvalidOperationException("Cart is empty");
        }

        // Validate addresses
        var shippingAddress = await _context.Addresses.FindAsync(createOrderDto.ShippingAddressId);
        if (shippingAddress == null || shippingAddress.UserId != userId)
        {
            throw new KeyNotFoundException("Shipping address not found");
        }

        // Calculate totals
        decimal subTotal = cart.CartItems.Sum(ci => ci.Product.Price * ci.Quantity);
        decimal tax = subTotal * 0.1m; // 10% tax
        decimal shippingCost = 10.00m; // Flat shipping
        decimal totalAmount = subTotal + tax + shippingCost;

        // Create order
        var order = new Order
        {
            UserId = userId,
            OrderNumber = GenerateOrderNumber(),
            SubTotal = subTotal,
            Tax = tax,
            ShippingCost = shippingCost,
            TotalAmount = totalAmount,
            Status = "Pending",
            PaymentStatus = "Pending",
            PaymentMethod = createOrderDto.PaymentMethod,
            ShippingAddressId = createOrderDto.ShippingAddressId,
            BillingAddressId = createOrderDto.BillingAddressId ?? createOrderDto.ShippingAddressId,
            Notes = createOrderDto.Notes,
            CreatedAt = DateTime.UtcNow
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        // Create order items
        foreach (var cartItem in cart.CartItems)
        {
            var orderItem = new OrderItem
            {
                OrderId = order.Id,
                ProductId = cartItem.ProductId,
                Quantity = cartItem.Quantity,
                UnitPrice = cartItem.Product.Price,
                TotalPrice = cartItem.Product.Price * cartItem.Quantity,
                ProductName = cartItem.Product.Name,
                ProductImageUrl = cartItem.Product.MainImageUrl
            };

            _context.OrderItems.Add(orderItem);

            // Update stock
            cartItem.Product.StockQuantity -= cartItem.Quantity;
        }

        // Clear cart
        _context.CartItems.RemoveRange(cart.CartItems);

        await _context.SaveChangesAsync();

        return _mapper.Map<OrderDto>(await _context.Orders
            .Include(o => o.OrderItems)
            .Include(o => o.ShippingAddress)
            .Include(o => o.BillingAddress)
            .FirstAsync(o => o.Id == order.Id));
    }

    public async Task<OrderDto?> UpdateOrderStatusAsync(int orderId, UpdateOrderStatusDto updateOrderStatusDto)
    {
        var order = await _context.Orders.FindAsync(orderId);

        if (order == null)
        {
            return null;
        }

        order.Status = updateOrderStatusDto.Status;
        order.UpdatedAt = DateTime.UtcNow;

        if (updateOrderStatusDto.Status == "Delivered")
        {
            order.DeliveredAt = DateTime.UtcNow;
        }

        await _context.SaveChangesAsync();

        return _mapper.Map<OrderDto>(await _context.Orders
            .Include(o => o.OrderItems)
            .Include(o => o.ShippingAddress)
            .Include(o => o.BillingAddress)
            .FirstAsync(o => o.Id == order.Id));
    }

    public async Task<IEnumerable<OrderListDto>> GetAllOrdersAsync()
    {
        var orders = await _context.Orders
            .Include(o => o.OrderItems)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();

        return _mapper.Map<IEnumerable<OrderListDto>>(orders);
    }

    private string GenerateOrderNumber()
    {
        return $"ORD-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString("N").Substring(0, 8).ToUpper()}";
    }
}
