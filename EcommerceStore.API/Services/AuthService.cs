using AutoMapper;
using Microsoft.EntityFrameworkCore;
using EcommerceStore.API.Data;
using EcommerceStore.API.DTOs;
using EcommerceStore.API.Helpers;
using EcommerceStore.API.Interfaces;
using EcommerceStore.API.Models;

namespace EcommerceStore.API.Services;

public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly JwtHelper _jwtHelper;

    public AuthService(ApplicationDbContext context, IMapper mapper, JwtHelper jwtHelper)
    {
        _context = context;
        _mapper = mapper;
        _jwtHelper = jwtHelper;
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto)
    {
        // Check if user already exists
        if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
        {
            throw new InvalidOperationException("User with this email already exists");
        }

        // Create new user
        var user = _mapper.Map<User>(registerDto);
        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);
        user.CreatedAt = DateTime.UtcNow;

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        // Create cart for user
        var cart = new Cart
        {
            UserId = user.Id,
            CreatedAt = DateTime.UtcNow
        };
        _context.Carts.Add(cart);
        await _context.SaveChangesAsync();

        // Generate token
        var response = _mapper.Map<AuthResponseDto>(user);
        response.Token = _jwtHelper.GenerateToken(user);

        return response;
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
    {
        // Find user
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == loginDto.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
        {
            throw new UnauthorizedAccessException("Invalid email or password");
        }

        if (!user.IsActive)
        {
            throw new UnauthorizedAccessException("Account is inactive");
        }

        // Generate token
        var response = _mapper.Map<AuthResponseDto>(user);
        response.Token = _jwtHelper.GenerateToken(user);

        return response;
    }

    public async Task<bool> ChangePasswordAsync(int userId, ChangePasswordDto changePasswordDto)
    {
        var user = await _context.Users.FindAsync(userId);

        if (user == null)
        {
            throw new KeyNotFoundException("User not found");
        }

        if (!BCrypt.Net.BCrypt.Verify(changePasswordDto.CurrentPassword, user.PasswordHash))
        {
            throw new UnauthorizedAccessException("Current password is incorrect");
        }

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(changePasswordDto.NewPassword);
        user.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return true;
    }
}
