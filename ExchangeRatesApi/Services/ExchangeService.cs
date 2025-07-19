using ExchangeRatesApi.Models;
using System.Text.Json;

namespace ExchangeRatesApi.Services
{
    public class ExchangeService : IExchangeService
    {
        private readonly HttpClient _httpClient;

        public ExchangeService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<ExchangeApiResponse> GetExchangeRatesAsync(string baseCurrency)
        {
            var url = $"https://api.frankfurter.app/latest?from={baseCurrency}";
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
