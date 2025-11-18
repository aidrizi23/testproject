using EcommerceStore.API.DTOs;

namespace EcommerceStore.API.Interfaces;

public interface IUserService
{
    Task<UserDto?> GetUserByIdAsync(int id);
    Task<UserDto?> UpdateUserAsync(int id, UpdateUserDto updateUserDto);
    Task<IEnumerable<AddressDto>> GetUserAddressesAsync(int userId);
    Task<AddressDto> CreateAddressAsync(int userId, CreateAddressDto createAddressDto);
    Task<AddressDto?> UpdateAddressAsync(int userId, int addressId, CreateAddressDto updateAddressDto);
    Task<bool> DeleteAddressAsync(int userId, int addressId);
}
