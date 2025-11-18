using EcommerceStore.API.DTOs;

namespace EcommerceStore.API.Interfaces;

public interface IReviewService
{
    Task<IEnumerable<ReviewDto>> GetProductReviewsAsync(int productId);
    Task<ReviewDto> CreateReviewAsync(int userId, CreateReviewDto createReviewDto);
    Task<bool> DeleteReviewAsync(int userId, int reviewId);
}
