using System.Text.Json.Serialization;

namespace ExchangeRatesApi.Models
{
    public class ExchangeApiResponse
    {
        [JsonPropertyName("base")]
        public string Base { get; set; }

        [JsonPropertyName("date")]
        public string Date { get; set; }

        [JsonPropertyName("rates")]
        public Dictionary<string, decimal> Rates { get; set; }
    }
}
