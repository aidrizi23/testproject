using EcommerceStore.API.DTOs;

namespace EcommerceStore.API.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto);
    Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
    Task<bool> ChangePasswordAsync(int userId, ChangePasswordDto changePasswordDto);
}
