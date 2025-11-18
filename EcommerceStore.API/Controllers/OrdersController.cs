using Microsoft.AspNetCore.Mvc;
using EcommerceStore.API.DTOs;
using EcommerceStore.API.Interfaces;

namespace EcommerceStore.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrderListDto>>> GetOrders()
    {
        try
        {
            var userId = GetCurrentUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            IEnumerable<OrderListDto> orders;

            if (IsAdmin())
            {
                orders = await _orderService.GetAllOrdersAsync();
            }
            else
            {
                orders = await _orderService.GetUserOrdersAsync(userId.Value);
            }

            return Ok(orders);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred", details = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDto>> GetOrder(int id)
    {
        try
        {
            var userId = GetCurrentUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            var order = await _orderService.GetOrderByIdAsync(id, userId.Value);

            if (order == null)
            {
                return NotFound(new { message = "Order not found" });
            }

            return Ok(order);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred", details = ex.Message });
        }
    }

    [HttpPost]
    public async Task<ActionResult<OrderDto>> CreateOrder([FromBody] CreateOrderDto createOrderDto)
    {
        try
        {
            var userId = GetCurrentUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            var order = await _orderService.CreateOrderAsync(userId.Value, createOrderDto);
            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred", details = ex.Message });
        }
    }

    [HttpPatch("{id}/status")]
    public async Task<ActionResult<OrderDto>> UpdateOrderStatus(int id, [FromBody] UpdateOrderStatusDto updateOrderStatusDto)
    {
        try
        {
            if (!IsAdmin())
            {
                return Unauthorized(new { message = "Admin access required" });
            }

            var order = await _orderService.UpdateOrderStatusAsync(id, updateOrderStatusDto);

            if (order == null)
            {
                return NotFound(new { message = "Order not found" });
            }

            return Ok(order);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred", details = ex.Message });
        }
    }

    private int? GetCurrentUserId()
    {
        return HttpContext.Items["UserId"] as int?;
    }

    private bool IsAdmin()
    {
        var user = HttpContext.Items["User"] as EcommerceStore.API.Models.User;
        return user?.IsAdmin ?? false;
    }
}
