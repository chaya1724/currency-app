using ExchangeRatesApi.Models;
using ExchangeRatesApi.Config;
using Microsoft.Extensions.Options;
using System.Text.Json;

namespace ExchangeRatesApi.Services
{
  public class ExchangeService : IExchangeService
  {
    private readonly HttpClient _httpClient;
    private readonly string _baseUrl;

    public ExchangeService(HttpClient httpClient, IOptions<FrankfurterApiSettings> options)
    {
      _httpClient = httpClient;
      _baseUrl = options.Value.BaseUrl.TrimEnd('/');
    }

    /// <summary>
    /// Returns the list of available currencies from the external API.
    /// </summary>
    public async Task<Dictionary<string, string>> GetAvailableCurrenciesAsync()
    {
      var url = $"{_baseUrl}/currencies";
      var response = await _httpClient.GetAsync(url);

      if (!response.IsSuccessStatusCode)
        return null;

      var content = await response.Content.ReadAsStringAsync();
      var options = new JsonSerializerOptions
      {
        PropertyNameCaseInsensitive = true
      };

      var currencies = JsonSerializer.Deserialize<Dictionary<string, string>>(content, options);
      return currencies;
    }

    /// <summary>
    /// Returns exchange rates for the selected base currency.
    /// </summary>
    public async Task<ExchangeApiResponse> GetExchangeRatesAsync(string baseCurrency)
    {
      var url = $"{_baseUrl}/latest?from={baseCurrency}";
      var response = await _httpClient.GetAsync(url);

      if (!response.IsSuccessStatusCode)
        return null;

      var content = await response.Content.ReadAsStringAsync();
      var options = new JsonSerializerOptions
      {
        PropertyNameCaseInsensitive = true
      };

      var data = JsonSerializer.Deserialize<ExchangeApiResponse>(content, options);
      return data;
    }
  }
}
