using Microsoft.AspNetCore.Mvc;
using EcommerceStore.API.DTOs;
using EcommerceStore.API.Interfaces;

namespace EcommerceStore.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("me")]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        try
        {
            var userId = GetCurrentUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            var user = await _userService.GetUserByIdAsync(userId.Value);

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            return Ok(user);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred", details = ex.Message });
        }
    }

    [HttpPut("me")]
    public async Task<ActionResult<UserDto>> UpdateCurrentUser([FromBody] UpdateUserDto updateUserDto)
    {
        try
        {
            var userId = GetCurrentUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            var user = await _userService.UpdateUserAsync(userId.Value, updateUserDto);

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            return Ok(user);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred", details = ex.Message });
        }
    }

    [HttpGet("me/addresses")]
    public async Task<ActionResult<IEnumerable<AddressDto>>> GetAddresses()
    {
        try
        {
            var userId = GetCurrentUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            var addresses = await _userService.GetUserAddressesAsync(userId.Value);
            return Ok(addresses);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred", details = ex.Message });
        }
    }

    [HttpPost("me/addresses")]
    public async Task<ActionResult<AddressDto>> CreateAddress([FromBody] CreateAddressDto createAddressDto)
    {
        try
        {
            var userId = GetCurrentUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            var address = await _userService.CreateAddressAsync(userId.Value, createAddressDto);
            return CreatedAtAction(nameof(GetAddresses), address);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred", details = ex.Message });
        }
    }

    [HttpPut("me/addresses/{addressId}")]
    public async Task<ActionResult<AddressDto>> UpdateAddress(int addressId, [FromBody] CreateAddressDto updateAddressDto)
    {
        try
        {
            var userId = GetCurrentUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            var address = await _userService.UpdateAddressAsync(userId.Value, addressId, updateAddressDto);

            if (address == null)
            {
                return NotFound(new { message = "Address not found" });
            }

            return Ok(address);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred", details = ex.Message });
        }
    }

    [HttpDelete("me/addresses/{addressId}")]
    public async Task<IActionResult> DeleteAddress(int addressId)
    {
        try
        {
            var userId = GetCurrentUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            var result = await _userService.DeleteAddressAsync(userId.Value, addressId);

            if (!result)
            {
                return NotFound(new { message = "Address not found" });
            }

            return Ok(new { message = "Address deleted successfully" });
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
