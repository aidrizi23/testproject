using AutoMapper;
using EcommerceStore.API.Models;
using EcommerceStore.API.DTOs;

namespace EcommerceStore.API.Helpers;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        // User mappings
        CreateMap<User, UserDto>();
        CreateMap<User, AuthResponseDto>();
        CreateMap<RegisterDto, User>();
        CreateMap<UpdateUserDto, User>();

        // Product mappings
        CreateMap<Product, ProductDto>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name));
        CreateMap<Product, ProductListDto>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name));
        CreateMap<CreateProductDto, Product>();
        CreateMap<UpdateProductDto, Product>();
        CreateMap<ProductImage, ProductImageDto>();

        // Category mappings
        CreateMap<Category, CategoryDto>()
            .ForMember(dest => dest.ProductCount, opt => opt.MapFrom(src => src.Products.Count));
        CreateMap<CreateCategoryDto, Category>();
        CreateMap<UpdateCategoryDto, Category>();

        // Cart mappings
        CreateMap<Cart, CartDto>()
            .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.CartItems))
            .ForMember(dest => dest.SubTotal, opt => opt.MapFrom(src =>
                src.CartItems.Sum(ci => ci.Product.Price * ci.Quantity)))
            .ForMember(dest => dest.TotalItems, opt => opt.MapFrom(src =>
                src.CartItems.Sum(ci => ci.Quantity)));

        CreateMap<CartItem, CartItemDto>()
            .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product.Name))
            .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Product.Price))
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.Product.MainImageUrl))
            .ForMember(dest => dest.Total, opt => opt.MapFrom(src => src.Product.Price * src.Quantity))
            .ForMember(dest => dest.StockQuantity, opt => opt.MapFrom(src => src.Product.StockQuantity));

        // Order mappings
        CreateMap<Order, OrderDto>()
            .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.OrderItems));
        CreateMap<Order, OrderListDto>()
            .ForMember(dest => dest.ItemCount, opt => opt.MapFrom(src => src.OrderItems.Count));
        CreateMap<OrderItem, OrderItemDto>();
        CreateMap<CreateOrderDto, Order>();

        // Address mappings
        CreateMap<Address, AddressDto>();
        CreateMap<CreateAddressDto, Address>();

        // Review mappings
        CreateMap<Review, ReviewDto>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src =>
                $"{src.User.FirstName} {src.User.LastName}"));
        CreateMap<CreateReviewDto, Review>();
    }
}
