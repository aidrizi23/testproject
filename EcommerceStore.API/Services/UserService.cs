using AutoMapper;
using Microsoft.EntityFrameworkCore;
using EcommerceStore.API.Data;
using EcommerceStore.API.DTOs;
using EcommerceStore.API.Interfaces;
using EcommerceStore.API.Models;

namespace EcommerceStore.API.Services;

public class UserService : IUserService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public UserService(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<UserDto?> GetUserByIdAsync(int id)
    {
        var user = await _context.Users.FindAsync(id);
        return user == null ? null : _mapper.Map<UserDto>(user);
    }

    public async Task<UserDto?> UpdateUserAsync(int id, UpdateUserDto updateUserDto)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return null;
        }

        _mapper.Map(updateUserDto, user);
        user.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return _mapper.Map<UserDto>(user);
    }

    public async Task<IEnumerable<AddressDto>> GetUserAddressesAsync(int userId)
    {
        var addresses = await _context.Addresses
            .Where(a => a.UserId == userId)
            .OrderByDescending(a => a.IsDefault)
            .ThenByDescending(a => a.CreatedAt)
            .ToListAsync();

        return _mapper.Map<IEnumerable<AddressDto>>(addresses);
    }

    public async Task<AddressDto> CreateAddressAsync(int userId, CreateAddressDto createAddressDto)
    {
        // If this is set as default, unset other default addresses
        if (createAddressDto.IsDefault)
        {
            var existingDefaultAddresses = await _context.Addresses
                .Where(a => a.UserId == userId && a.IsDefault)
                .ToListAsync();

            foreach (var addr in existingDefaultAddresses)
            {
                addr.IsDefault = false;
            }
        }

        var address = _mapper.Map<Address>(createAddressDto);
        address.UserId = userId;
        address.CreatedAt = DateTime.UtcNow;

        _context.Addresses.Add(address);
        await _context.SaveChangesAsync();

        return _mapper.Map<AddressDto>(address);
    }

    public async Task<AddressDto?> UpdateAddressAsync(int userId, int addressId, CreateAddressDto updateAddressDto)
    {
        var address = await _context.Addresses
            .FirstOrDefaultAsync(a => a.Id == addressId && a.UserId == userId);

        if (address == null)
        {
            return null;
        }

        // If this is set as default, unset other default addresses
        if (updateAddressDto.IsDefault && !address.IsDefault)
        {
            var existingDefaultAddresses = await _context.Addresses
                .Where(a => a.UserId == userId && a.IsDefault && a.Id != addressId)
                .ToListAsync();

            foreach (var addr in existingDefaultAddresses)
            {
                addr.IsDefault = false;
            }
        }

        _mapper.Map(updateAddressDto, address);

        await _context.SaveChangesAsync();

        return _mapper.Map<AddressDto>(address);
    }

    public async Task<bool> DeleteAddressAsync(int userId, int addressId)
    {
        var address = await _context.Addresses
            .FirstOrDefaultAsync(a => a.Id == addressId && a.UserId == userId);

        if (address == null)
        {
            return false;
        }

        _context.Addresses.Remove(address);
        await _context.SaveChangesAsync();

        return true;
    }
}
