using ExchangeRatesApi.Models;

namespace ExchangeRatesApi.Services
{
    public interface IExchangeService
    {
        Task<ExchangeApiResponse> GetExchangeRatesAsync(string baseCurrency);
        Task<Dictionary<string, string>> GetAvailableCurrenciesAsync();
  }
}
