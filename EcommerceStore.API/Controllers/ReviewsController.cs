using Microsoft.AspNetCore.Mvc;
using EcommerceStore.API.DTOs;
using EcommerceStore.API.Interfaces;

namespace EcommerceStore.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReviewsController : ControllerBase
{
    private readonly IReviewService _reviewService;

    public ReviewsController(IReviewService reviewService)
    {
        _reviewService = reviewService;
    }

    [HttpGet("product/{productId}")]
    public async Task<ActionResult<IEnumerable<ReviewDto>>> GetProductReviews(int productId)
    {
        try
        {
            var reviews = await _reviewService.GetProductReviewsAsync(productId);
            return Ok(reviews);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred", details = ex.Message });
        }
    }

    [HttpPost]
    public async Task<ActionResult<ReviewDto>> CreateReview([FromBody] CreateReviewDto createReviewDto)
    {
        try
        {
            var userId = GetCurrentUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            var review = await _reviewService.CreateReviewAsync(userId.Value, createReviewDto);
            return CreatedAtAction(nameof(GetProductReviews), new { productId = review.ProductId }, review);
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

    [HttpDelete("{reviewId}")]
    public async Task<IActionResult> DeleteReview(int reviewId)
    {
        try
        {
            var userId = GetCurrentUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            var result = await _reviewService.DeleteReviewAsync(userId.Value, reviewId);

            if (!result)
            {
                return NotFound(new { message = "Review not found" });
            }

            return Ok(new { message = "Review deleted successfully" });
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
