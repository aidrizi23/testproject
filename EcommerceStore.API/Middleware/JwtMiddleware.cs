using EcommerceStore.API.Data;
using EcommerceStore.API.Helpers;

namespace EcommerceStore.API.Middleware;

public class JwtMiddleware
{
    private readonly RequestDelegate _next;

    public JwtMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context, ApplicationDbContext dbContext, JwtHelper jwtHelper)
    {
        var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        if (token != null)
        {
            var userId = jwtHelper.ValidateToken(token);
            if (userId != null)
            {
                // Attach user to context
                context.Items["UserId"] = userId;
                var user = await dbContext.Users.FindAsync(userId.Value);
                context.Items["User"] = user;
            }
        }

        await _next(context);
    }
}
