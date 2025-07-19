using ExchangeRatesApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExchangeRatesApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExchangeController : ControllerBase
{
    private readonly IExchangeService _exchangeService;

    public ExchangeController(IExchangeService exchangeService)
    {
        _exchangeService = exchangeService;
    }

    [HttpGet("{baseCurrency}")]
    public async Task<IActionResult> GetRates(string baseCurrency)
    {
        var data = await _exchangeService.GetExchangeRatesAsync(baseCurrency);

        if (data == null || data.Rates == null)
            return BadRequest("Invalid response from API");

        return Ok(new { rates = data.Rates });
    }
}
