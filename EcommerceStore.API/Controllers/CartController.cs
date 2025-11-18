using Microsoft.AspNetCore.Mvc;
using EcommerceStore.API.DTOs;
using EcommerceStore.API.Interfaces;

namespace EcommerceStore.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly ICartService _cartService;

    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    [HttpGet]
    public async Task<ActionResult<CartDto>> GetCart()
    {
        try
        {
            var userId = GetCurrentUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            var cart = await _cartService.GetCartAsync(userId.Value);
            return Ok(cart);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred", details = ex.Message });
        }
    }

    [HttpPost("items")]
    public async Task<ActionResult<CartDto>> AddToCart([FromBody] AddToCartDto addToCartDto)
    {
        try
        {
            var userId = GetCurrentUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            var cart = await _cartService.AddToCartAsync(userId.Value, addToCartDto);
            return Ok(cart);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred", details = ex.Message });
        }
    }

    [HttpPut("items/{cartItemId}")]
    public async Task<ActionResult<CartDto>> UpdateCartItem(int cartItemId, [FromBody] UpdateCartItemDto updateCartItemDto)
    {
        try
        {
            var userId = GetCurrentUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            var cart = await _cartService.UpdateCartItemAsync(userId.Value, cartItemId, updateCartItemDto);
            return Ok(cart);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred", details = ex.Message });
        }
    }

    [HttpDelete("items/{cartItemId}")]
    public async Task<ActionResult<CartDto>> RemoveFromCart(int cartItemId)
    {
        try
        {
            var userId = GetCurrentUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            var cart = await _cartService.RemoveFromCartAsync(userId.Value, cartItemId);
            return Ok(cart);
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

    [HttpDelete]
    public async Task<IActionResult> ClearCart()
    {
        try
        {
            var userId = GetCurrentUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            await _cartService.ClearCartAsync(userId.Value);
            return Ok(new { message = "Cart cleared successfully" });
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
}
