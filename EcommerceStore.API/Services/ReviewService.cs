using AutoMapper;
using Microsoft.EntityFrameworkCore;
using EcommerceStore.API.Data;
using EcommerceStore.API.DTOs;
using EcommerceStore.API.Interfaces;
using EcommerceStore.API.Models;

namespace EcommerceStore.API.Services;

public class ReviewService : IReviewService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public ReviewService(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ReviewDto>> GetProductReviewsAsync(int productId)
    {
        var reviews = await _context.Reviews
            .Include(r => r.User)
            .Where(r => r.ProductId == productId)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();

        return _mapper.Map<IEnumerable<ReviewDto>>(reviews);
    }

    public async Task<ReviewDto> CreateReviewAsync(int userId, CreateReviewDto createReviewDto)
    {
        // Check if user has already reviewed this product
        var existingReview = await _context.Reviews
            .FirstOrDefaultAsync(r => r.UserId == userId && r.ProductId == createReviewDto.ProductId);

        if (existingReview != null)
        {
            throw new InvalidOperationException("You have already reviewed this product");
        }

        // Check if user has purchased this product
        var hasPurchased = await _context.OrderItems
            .Include(oi => oi.Order)
            .AnyAsync(oi => oi.ProductId == createReviewDto.ProductId &&
                           oi.Order.UserId == userId &&
                           oi.Order.Status == "Delivered");

        var review = _mapper.Map<Review>(createReviewDto);
        review.UserId = userId;
        review.IsVerifiedPurchase = hasPurchased;
        review.CreatedAt = DateTime.UtcNow;

        _context.Reviews.Add(review);

        // Update product rating
        var product = await _context.Products.FindAsync(createReviewDto.ProductId);
        if (product != null)
        {
            var allReviews = await _context.Reviews
                .Where(r => r.ProductId == createReviewDto.ProductId)
                .ToListAsync();

            allReviews.Add(review);

            product.AverageRating = allReviews.Average(r => r.Rating);
            product.ReviewCount = allReviews.Count;
        }

        await _context.SaveChangesAsync();

        return _mapper.Map<ReviewDto>(await _context.Reviews
            .Include(r => r.User)
            .FirstAsync(r => r.Id == review.Id));
    }

    public async Task<bool> DeleteReviewAsync(int userId, int reviewId)
    {
        var review = await _context.Reviews
            .FirstOrDefaultAsync(r => r.Id == reviewId && r.UserId == userId);

        if (review == null)
        {
            return false;
        }

        _context.Reviews.Remove(review);

        // Update product rating
        var product = await _context.Products.FindAsync(review.ProductId);
        if (product != null)
        {
            var remainingReviews = await _context.Reviews
                .Where(r => r.ProductId == review.ProductId && r.Id != reviewId)
                .ToListAsync();

            product.AverageRating = remainingReviews.Any() ? remainingReviews.Average(r => r.Rating) : 0;
            product.ReviewCount = remainingReviews.Count;
        }

        await _context.SaveChangesAsync();

        return true;
    }
}
