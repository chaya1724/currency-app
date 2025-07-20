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
  [HttpGet("currencies")]
  public async Task<IActionResult> GetCurrencies()
  {
    var currencies = await _exchangeService.GetAvailableCurrenciesAsync();

    if (currencies == null || currencies.Count == 0)
      return BadRequest("Unable to retrieve currencies");

    return Ok(new { currencies });
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
